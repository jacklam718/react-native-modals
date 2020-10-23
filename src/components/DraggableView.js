/* eslint no-underscore-dangle: ["error", { "allow": ["_value"] }] */
// @flow

import React, { Component } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
import type { ViewLayoutEvent } from 'react-native/Libraries/Components/View/ViewPropTypes';
import type { SwipeDirection, DragEvent } from '../type';

type Props = {
  style?: any;
  onMove?: (event: DragEvent) => void;
  onSwiping?: (event: DragEvent) => void;
  onRelease?: (event: DragEvent) => void;
  onSwipingOut?: (event: DragEvent) => void;
  onSwipeOut?: (event: DragEvent) => void;
  swipeThreshold?: number;
  swipeDirection?: SwipeDirection | Array<SwipeDirection>;
  children: ({
    onLayout: (event: ViewLayoutEvent) => void;
    pan: Animated.ValueXY;
  }) => React.Node;
}

export default class DraggableView extends Component<Props> {
  static defaultProps = {
    style: null,
    onMove: () => {},
    onSwiping: () => {},
    onSwipingOut: () => {},
    onSwipeOut: null,
    onRelease: () => {},
    swipeThreshold: 100,
    swipeDirection: [],
  };

  constructor(props: Props) {
    super(props);

    this.pan = new Animated.ValueXY();
    this.allowedDirections = [].concat(props.swipeDirection);
    this.layout = null;
  }

  componentDidMount() {
    this.panEventListenerId = this.pan.addListener((axis) => {
      this.props.onMove(this.createDragEvent(axis));
    });
  }

  componentWillUnmount() {
    this.pan.removeListener(this.panEventListenerId);
  }

  onLayout = (event) => {
    this.layout = event.nativeEvent.layout;
  }

  getSwipeDirection(gestureState) {
    if (this.isValidHorizontalSwipe(gestureState)) {
      return (gestureState.dx > 0) ? 'right' : 'left';
    } else if (this.isValidVerticalSwipe(gestureState)) {
      return (gestureState.dy > 0) ? 'down' : 'up';
    }
    return null;
  }

  getDisappearDirection() {
    const { width, height } = Dimensions.get('window');
    const vertical = ((height / 2) + (this.layout.height / 2));
    const horizontal = ((width / 2) + (this.layout.width / 2));
    let toValue;
    if (this.currentSwipeDirection === 'up') {
      toValue = {
        x: 0,
        y: -vertical,
      };
    } else if (this.currentSwipeDirection === 'down') {
      toValue = {
        x: 0,
        y: vertical,
      };
    } else if (this.currentSwipeDirection === 'left') {
      toValue = {
        x: -horizontal,
        y: 0,
      };
    } else if (this.currentSwipeDirection === 'right') {
      toValue = {
        x: horizontal,
        y: 0,
      };
    }
    return toValue;
  }

  isValidHorizontalSwipe({ vx, dy }) {
    return this.isValidSwipe(vx, dy);
  }

  isValidVerticalSwipe({ vy, dx }) {
    return this.isValidSwipe(vy, dx);
  }

  // eslint-disable-next-line class-methods-use-this
  isValidSwipe(velocity, directionalOffset) {
    const velocityThreshold = 0.3;
    const directionalOffsetThreshold = 80;
    // eslint-disable-next-line max-len
    return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
  }

  isAllowedDirection({ dy, dx }) {
    const draggedDown = dy > 0;
    const draggedUp = dy < 0;
    const draggedLeft = dx < 0;
    const draggedRight = dx > 0;
    const isAllowedDirection = d => (
      this.currentSwipeDirection === d && this.allowedDirections.includes(d)
    );
    if (draggedDown && isAllowedDirection('down')) {
      return true;
    } else if (draggedUp && isAllowedDirection('up')) {
      return true;
    } else if (draggedLeft && isAllowedDirection('left')) {
      return true;
    } else if (draggedRight && isAllowedDirection('right')) {
      return true;
    }
    return false;
  }

  createDragEvent(axis): DragEvent {
    return {
      axis,
      layout: this.layout,
      swipeDirection: this.currentSwipeDirection,
    };
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => (
      gestureState.dx !== 0 && gestureState.dy !== 0
    ),
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const isVerticalSwipe = d => ['up', 'down'].includes(d);
      const isHorizontalSwipe = d => ['left', 'right'].includes(d);
      
      const newSwipeDirection = this.getSwipeDirection(gestureState);
      const isSameDirection =
        isVerticalSwipe(this.currentSwipeDirection) === isVerticalSwipe(newSwipeDirection) ||
        isHorizontalSwipe(this.currentSwipeDirection) === isHorizontalSwipe(newSwipeDirection)
      // newDirection & currentSwipeDirection must be same direction
      if (newSwipeDirection && isSameDirection) {
        this.currentSwipeDirection = newSwipeDirection;
      }
      if (this.isAllowedDirection(gestureState)) {
        let animEvent;
        if (isVerticalSwipe(this.currentSwipeDirection)) {
          animEvent = { dy: this.pan.y };
        } else if (isHorizontalSwipe(this.currentSwipeDirection)) {
          animEvent = { dx: this.pan.x };
        }
        Animated.event([null, animEvent], {useNativeDriver: false})(event, gestureState);
        this.props.onSwiping(this.createDragEvent({
          x: this.pan.x._value,
          y: this.pan.y._value,
        }));
      }
    },
    onPanResponderRelease: () => {
      this.pan.flattenOffset();
      const event = this.createDragEvent({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });
      // on swipe out
      if (
        this.props.onSwipeOut &&
        Math.abs(this.pan.y._value) > this.props.swipeThreshold ||
        Math.abs(this.pan.x._value) > this.props.swipeThreshold
      ) {
        this.props.onSwipingOut(event);
        Animated.spring(this.pan, {
          toValue: this.getDisappearDirection(),
          velocity: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: false,
        }).start(() => {
          this.props.onSwipeOut(event);
        });
        return;
      }
      // on release
      this.currentSwipeDirection = null;
      this.props.onRelease(event);
      Animated.spring(this.pan, {
        toValue: { x: 0, y: 0 },
        velocity: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: false,
      }).start();
    },
  });

  render() {
    const { style, children: renderContent } = this.props;
    const content = renderContent({
      pan: this.pan,
      onLayout: this.onLayout,
    });

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={style}
      >
        {content}
      </Animated.View>
    );
  }
}
