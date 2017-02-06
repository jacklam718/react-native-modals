// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

import Overlay from './Overlay';

import DefaultAnimation from '../animations/DefaultAnimation';
import type { DialogType } from '../Type';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// dialog states
const DIALOG_OPENING: string = 'opening';
const DIALOG_OPENED: string = 'opened';
const DIALOG_CLOSING: string = 'closing';
const DIALOG_CLOSED: string = 'closed';

// default dialog config
const DEFAULT_ANIMATION_DURATION: number = 150;
const DEFAULT_WIDTH: number = screenWidth;
const DEFAULT_HEIGHT: number = 300;
const CLOSE_ON_TOUCH_OUTSIDE: bool = true;
const HAVE_OVERLAY: bool = true;

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

class Dialog extends Component {
  state: {
    dialogState: string,
  }

  props: DialogType

  static defaultProps = {
    animationDuration: DEFAULT_ANIMATION_DURATION,
    dialogAnimation: new DefaultAnimation({ animationDuration: DEFAULT_ANIMATION_DURATION }),
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    closeOnTouchOutside: CLOSE_ON_TOUCH_OUTSIDE,
    haveOverlay: HAVE_OVERLAY,
    onOpened: () => {},
    onClosed: () => {},
  }

  onOverlayPress: Function

  constructor(props: DialogType) {
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

  componentWillReceiveProps(nextProps: DialogType) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        this.open(nextProps.onOpened);
      } else {
        this.close(nextProps.onClosed);
      }
    }
  }

  onOverlayPress() {
    if (this.props.closeOnTouchOutside) {
      this.close(this.props.onClosed);
    }
  }

  setDialogState(toValue: number, callback: ?Function) {
    let dialogState = toValue ? DIALOG_OPENING : DIALOG_CLOSING;

    // to make sure has passed the dialogAnimation prop and the dialogAnimation has toValue method
    if (this.props.dialogAnimation && this.props.dialogAnimation.toValue) {
      this.props.dialogAnimation.toValue(toValue);
    }

    this.setState({ dialogState });

    setTimeout(() => {
      dialogState = dialogState === DIALOG_CLOSING ? DIALOG_CLOSED : DIALOG_OPENED;
      this.setState({ dialogState });
      if (typeof callback === 'function') {
        callback();
      }
    }, this.props.animationDuration);
  }

  open(onOpened?: Function = () => {}) {
    this.setDialogState(1, onOpened);
  }

  close(onClosed?: Function = () => {}) {
    this.setDialogState(0, onClosed);
  }

  get pointerEvents(): string {
    if (this.props.overlayPointerEvents) {
      return this.props.overlayPointerEvents;
    }
    return this.state.dialogState === DIALOG_OPENED ? 'auto' : 'none';
  }

  get dialogSize(): Object {
    let { width, height } = this.props;

    if (width && width > 0.0 && width <= 1.0) {
      width *= screenWidth;
    }
    if (height && height > 0.0 && height <= 1.0) {
      height *= screenHeight;
    }

    return { width, height };
  }

  render() {
    const dialogState = this.state.dialogState;
    const overlayPointerEvents = this.pointerEvents;
    const dialogSize = this.dialogSize;
    const hidden = dialogState === DIALOG_CLOSED && styles.hidden;
    const isShowOverlay = (
      [DIALOG_OPENING, DIALOG_OPENED].includes(dialogState) && this.props.haveOverlay
    );
    const dimensions = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

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

export default Dialog;
