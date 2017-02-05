/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Overlay from './Overlay';
import DefaultAnimation from '../animations/DefaultAnimation';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// dialog states
const DIALOG_OPENING: string = 'opening';
const DIALOG_OPENED: string = 'opened';
const DIALOG_CLOSING: string = 'closing';
const DIALOG_CLOSED: string = 'closed';

// default dialog config
const DEFAULT_ANIMATION_DURATION: number = 150;
const DEFAULT_WIDTH: number = WIDTH;
const DEFAULT_HEIGHT: number = 300;
const CLOSE_ON_TOUCH_OUTSIDE: bool = true;
const HAVE_OVERLAY: bool = true;

type Props = {
  width: number;
  height: number;
  haveOverlay: bool;
  overlayPointerEvents: string;
  overlayBackgroundColor: string;
  overlayOpacity: number;
  dialogAnimation: Object;
  dialogStyle: Object | number;
  animationDuration: number;
  closeOnTouchOutside: bool;
  open: bool;
  onOpened: Function;
  onClosed: Function;
  actions: Array;
  children: any;
};

class Dialog extends Component {
  state: {
    dialogState: DIALOG_OPENING | DIALOG_OPENED | DIALOG_CLOSING | DIALOG_CLOSED;
  }

  props: Props;

  static defaultProps = {
    animationDuration: DEFAULT_ANIMATION_DURATION,
    dialogAnimation: new DefaultAnimation({ animationDuration: DEFAULT_ANIMATION_DURATION }),
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    closeOnTouchOutside: CLOSE_ON_TOUCH_OUTSIDE,
    haveOverlay: HAVE_OVERLAY,
    onOpened: () => {},
    onClosed: () => {},
  };

  constructor(props) {
    super(props);
    // opened, opening, closed, closing,
    this.state = {
      dialogState: DIALOG_CLOSED,
    };

    this.onOverlayPress = this.onOverlayPress.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      this.open(this.props.onOpened);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        return this.open(nextProps.onOpened);
      }
      return this.close(nextProps.onClosed);
    }
    return nextProps;
  }

  onOverlayPress() {
    if (this.props.closeOnTouchOutside) {
      this.close(this.props.onClosed);
    }
  }

  setDialogState(toValue: number, callback: Function) {
    this.props.dialogAnimation.toValue(toValue);
    let dialogState = toValue ? DIALOG_OPENING : DIALOG_CLOSING;

    this.setState({ dialogState });

    setTimeout(() => {
      dialogState = dialogState === DIALOG_CLOSING ? DIALOG_CLOSED : DIALOG_OPENED;
      this.setState({ dialogState });
      callback();
    }, this.props.animationDuration);
  }

  calculateDialogSize({ width, height }: {width: number, height: number}): Object {
    const size = {};

    if (width) {
      size.width = width;
    }
    if (height) {
      size.height = height;
    }

    if (width > 0.0 && width <= 1.0) {
      size.width = width * WIDTH;
    }
    if (height > 0.0 && height <= 1.0) {
      size.height = height * HEIGHT;
    }
    return size;
  }

  open(onOpened: Function) {
    this.setDialogState(1, onOpened);
  }

  close(onClosed: Function) {
    this.setDialogState(0, onClosed);
  }

  get pointerEvents() {
    if (this.props.overlayPointerEvents) {
      return this.props.overlayPointerEvents;
    }
    return this.state.dialogState === DIALOG_OPENED ? 'auto' : 'none';
  }

  render() {
    const dialogState = this.state.dialogState;
    const hidden = dialogState === DIALOG_CLOSED && styles.hidden;
    const overlayPointerEvents = this.pointerEvents;
    const isShowOverlay = (
      [DIALOG_OPENING, DIALOG_OPENED].includes(dialogState) && this.props.haveOverlay
    );
    const dimensions = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
    const dialogSize = this.calculateDialogSize(this.props);

    return (
      <View style={[styles.container, hidden, dimensions]}>
        <Overlay
          pointerEvents={overlayPointerEvents}
          showOverlay={isShowOverlay}
          onPress={this.onOverlayPress}
          backgroundColor={this.props.overlayBackgroundColor}
          opacity={this.props.overlayOpacity}
          animationDuration={this.props.animationDuration}
        />
        <Animated.View
          style={[
            styles.dialog,
            dialogSize,
            this.props.dialogStyle,
            this.props.dialogAnimation.animations,
          ]}
        >
          {this.props.children}
          {this.props.actions}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
});

export default Dialog;
