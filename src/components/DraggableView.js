// @flow

import React, { Component } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
import type { SwipeDirection, DragEvent } from '../type';

export default class DraggableView extends Component {
  props: {
    style?: any;
    onMove?: (event: DragEvent) => void;
    onSwiping?: (event: DragEvent) => void;
    onRelease?: (event: DragEvent) => void;
    onSwipeOut?: (event: DragEvent) => void;
    swipeThreshold?: number;
    swipeDirection?: SwipeDirection | Array<SwipeDirection>;
    backdrop: React.Element;
    content: React.Element;
  };

  static defaultProps = {
    style: null,
    onMove: () => {},
    onRelease: () => {},
    swipeThreshold: 100,
    swipeDirection: [],
  };

  constructor(props) {
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

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx !== 0 && gestureState.dy !== 0;
    },
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // get & set currentSwipeDirection
      if (!this.currentSwipeDirection) {
        this.currentSwipeDirection = this.getSwipeDirection(gestureState)
      }

      if (this.isAllowedDirection(gestureState)) { 
        let animEvent;
        if (['up', 'down'].includes(this.currentSwipeDirection)) {
          animEvent = { dy: this.pan.y };
        } else if (['left', 'right'].includes(this.currentSwipeDirection)) {
          animEvent = { dx: this.pan.x };
        }
        Animated.event([null, animEvent])(event, gestureState);

        this.props.onSwiping(this.createDragEvent({
          x: this.pan.x._value,
          y: this.pan.y._value,
        }));
      }
    },
    onPanResponderRelease: () => {
      const event = this.createDragEvent({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });

      if (
        this.props.onSwipeOut &&
        Math.abs(this.pan.y._value) > this.props.swipeThreshold ||
        Math.abs(this.pan.x._value) > this.props.swipeThreshold
      ) {
        let toValue;
        if (this.currentSwipeDirection === 'up') {
          toValue = {
            x: 0,
            y: -((Dimensions.get('window').height / 2) + (this.layout.height / 2)),
          };
        } else if (this.currentSwipeDirection === 'down') {
          toValue = {
            x: 0,
            y: ((Dimensions.get('window').height / 2) + (this.layout.height / 2)),
          };
        } else if (this.currentSwipeDirection === 'left') {
          toValue = {
            x: -((Dimensions.get('window').width / 2) + (this.layout.width / 2)),
            y: 0,
          };
        } else if (this.currentSwipeDirection === 'right') {
          toValue = {
            x: ((Dimensions.get('window').width / 2) + (this.layout.width / 2)),
            y: 0,
          };
        }
        Animated.spring(this.pan, {
          toValue,
          velocity: 0,
          tension: 65,
          friction: 11,
        }).start(() => {
          this.props.onSwipeOut(event);
        });
        return;
      }

      this.currentSwipeDirection = null;
      this.props.onRelease(event);
      Animated.spring(this.pan, {
        toValue: { x: 0, y: 0 },
        velocity: 0,
        tension: 65,
        friction: 11,
      }).start();
    },
  });

  createDragEvent(axis): DragEvent {
    return {
      axis,
      layout: this.layout,
      swipeDirection: this.currentSwipeDirection,
    };
  }

  isAllowedDirection({ dy, dx }) {
    const draggedDown = dy > 0;
    const draggedUp = dy < 0;
    const draggedLeft = dx < 0;
    const draggedRight = dx > 0;

    const isAllowedDirection = direction => (
      this.currentSwipeDirection === direction && this.allowedDirections.includes(direction)
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

  isValidSwipe(velocity, directionalOffset) {
    const velocityThreshold = 0.3;
    const directionalOffsetThreshold = 80;
    return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
  }

  isValidHorizontalSwipe({ vx, dy }) {
    return this.isValidSwipe(vx, dy);
  }

  isValidVerticalSwipe({ vy, dx }) {
    return this.isValidSwipe(vy, dx);
  }

  getSwipeDirection(gestureState) {
    if (this.isValidHorizontalSwipe(gestureState)) {
      return (gestureState.dx > 0) ? 'right' : 'left';
    } else if (this.isValidVerticalSwipe(gestureState)) {
      return (gestureState.dy > 0) ? 'down' : 'up';
    }
    return null;
  }

  onLayout = (event) => {
    this.layout = event.nativeEvent.layout;
  }

  render() {
    const { style, backdrop, content } = this.props;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={style}
      >
        {backdrop}
        <Animated.View
          style={this.pan.getLayout()}
          onLayout={this.onLayout}
        >
          {content}
        </Animated.View>
      </Animated.View>
    );
  }
}
