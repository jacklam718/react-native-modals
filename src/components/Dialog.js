// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  BackAndroid,
  Platform,
} from 'react-native';

import Overlay from './Overlay';

import DefaultAnimation from '../animations/DefaultAnimation';
import { type DialogType } from '../Type';

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
const DISMISS_ON_TOUCH_OUTSIDE: boolean = true;
const DISMISS_ON_HARDWARE_BACK_PRESS: boolean = true;
const HAVE_OVERLAY: boolean = true;

// event types
// only for android
const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';

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
    closeOnTouchOutside: DISMISS_ON_TOUCH_OUTSIDE,
    dismissOnTouchOutside: DISMISS_ON_TOUCH_OUTSIDE,
    closeOnHardwareBackPress: DISMISS_ON_HARDWARE_BACK_PRESS, // Note: closeOnHardwareBackPress deprecated
    dismissOnHardwareBackPress: DISMISS_ON_HARDWARE_BACK_PRESS,
    haveOverlay: HAVE_OVERLAY,
    onOpened: () => {}, // Note: onOpened deprecated
    onClosed: () => {}, // Note: onClosed deprecated
    onShowed: () => {},
    onDismissed: () => {},
    show: false,
  }

  constructor(props: DialogType) {
    super(props);
    // opened, opening, closed, closing,
    this.state = {
      dialogState: DIALOG_CLOSED,
    };

    (this: any).onOverlayPress = this.onOverlayPress.bind(this);
    (this: any).hardwareBackEventHandler = this.hardwareBackEventHandler.bind(this);
  }

  componentDidMount() {
    const { show, onShowed } = this.props;

    if (show) {
      this.open(onShowed);
    }

    BackAndroid.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackEventHandler);
  }

  hardwareBackEventHandler(): boolean {
    const { onDismissed, closeOnHardwareBackPress, dismissOnHardwareBackPress } = this.props;
    const { dialogState } = this.state;
    // Note: closeOnHardwareBackPress is deprecated
    const isDismissOnHardwareBackPress = (closeOnHardwareBackPress || dismissOnHardwareBackPress);

    if (isDismissOnHardwareBackPress && dialogState === DIALOG_OPENED) {
      this.dismiss(onDismissed);
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps: DialogType) {
    // Note: deprecated. here only for backward compatibility
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        this.open(nextProps.onOpened);
      } else {
        this.close(nextProps.onClosed);
      }
    }

    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        this.show(nextProps.onShowed);
      } else {
        this.dismiss(nextProps.onDismissed);
      }
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
  }

  onOverlayPress() {
    // Note: closeOnTouchOutside is deprecated
    const { onClosed, onDismissed, dismissOnTouchOutside, closeOnTouchOutside } = this.props;

    // Here only for backward compatibility
    if (closeOnTouchOutside) {
      this.close(onClosed);
    }

    if (dismissOnTouchOutside) {
      this.dismiss(onDismissed);
    }
  }

  setDialogState(toValue: number, callback?: Function = () => {}) {
    let dialogState = toValue ? DIALOG_OPENING : DIALOG_CLOSING;

    // to make sure has passed the dialogAnimation prop and the dialogAnimation has toValue method
    if (this.props.dialogAnimation && this.props.dialogAnimation.toValue) {
      this.props.dialogAnimation.toValue(toValue);
    }

    this.setState({ dialogState });

    setTimeout(() => {
      dialogState = dialogState === DIALOG_CLOSING ? DIALOG_CLOSED : DIALOG_OPENED;
      this.setState({ dialogState });
      callback();
    }, this.props.animationDuration);
  }

  // Note: open is deprecated
  open(onOpened?: Function = () => {}) {
    this.setDialogState(1, onOpened);
  }

  // Note: close is deprecated
  close(onClosed?: Function = () => {}) {
    this.setDialogState(0, onClosed);
  }

  show(onShowed?: Function = () => {}) {
    this.setDialogState(1, onShowed);
  }

  dismiss(onDismissed?: Function = () => {}) {
    this.setDialogState(0, onDismissed);
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

  get borderRadius(): Object {
    let { borderRadius } = this.props;

    if (borderRadius != null) {
      return { borderRadius: borderRadius };
    } else {
      return { borderRadius: 8 };
    }
  }

  render() {
    const dialogState = this.state.dialogState;
    const overlayPointerEvents = this.pointerEvents;
    const dialogSize = this.dialogSize;
    const borderRadius = this.borderRadius;
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
            borderRadius,
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
