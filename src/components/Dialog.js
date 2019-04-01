// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  BackAndroid as RNBackAndroid,
  BackHandler as RNBackHandler,
} from 'react-native';

import Overlay from './Overlay';
import type { DialogProps } from '../type';
import Animation from '../animations/Animation';
import FadeAnimation from '../animations/FadeAnimation';

const BackHandler = RNBackHandler || RNBackAndroid;

// dialog states
const DIALOG_OPENING: string = 'opening';
const DIALOG_OPENED: string = 'opened';
const DIALOG_CLOSING: string = 'closing';
const DIALOG_CLOSED: string = 'closed';

// default dialog config
const DEFAULT_ANIMATION_DURATION: number = 150;

// event types
const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 10,
  },
  dialog: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
  round: {
    borderRadius: 8,
  },
});

type DialogState =
 | typeof DIALOG_OPENING
 | typeof DIALOG_OPENED
 | typeof DIALOG_CLOSING
 | typeof DIALOG_CLOSED

type State = {
  dialogAnimation: Animation;
  dialogState: DialogState;
}

class Dialog extends Component<DialogProps, State> {
  static defaultProps = {
    rounded: true,
    dialogTitle: null,
    visible: false,
    containerStyle: null,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    dialogStyle: null,
    width: null,
    height: null,
    onTouchOutside: () => {},
    onHardwareBackPress: () => false,
    hasOverlay: true,
    overlayOpacity: 0.5,
    overlayPointerEvents: null,
    overlayBackgroundColor: '#000',
    onShow: () => {},
    onDismiss: () => {},
    footer: null,
    useNativeDriver: true,
  }

  constructor(props: DialogProps) {
    super(props);

    this.state = {
      dialogAnimation: props.dialogAnimation || new FadeAnimation({
        animationDuration: props.animationDuration,
      }),
      dialogState: DIALOG_CLOSED,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.onHardwareBackPress);
  }

  componentDidUpdate(prevProps: DialogProps) {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.show();
        return;
      }
      this.dismiss();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT, this.onHardwareBackPress);
  }

  onHardwareBackPress = (): boolean => this.props.onHardwareBackPress();

  get pointerEvents(): string {
    const { overlayPointerEvents } = this.props;
    const { dialogState } = this.state;
    if (overlayPointerEvents) {
      return overlayPointerEvents;
    }
    return dialogState === DIALOG_OPENED ? 'auto' : 'none';
  }

  get dialogSize(): Object {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    let { width, height } = this.props;
    if (width && width > 0.0 && width <= 1.0) {
      width *= screenWidth;
    }
    if (height && height > 0.0 && height <= 1.0) {
      height *= screenHeight;
    }
    return { width, height };
  }

  show(): void {
    this.setState({ dialogState: DIALOG_OPENING }, () => {
      this.state.dialogAnimation.in(() => {
        this.setState({ dialogState: DIALOG_OPENED }, this.props.onShow);
      });
    });
  }

  dismiss(): void {
    this.setState({ dialogState: DIALOG_CLOSING }, () => {
      this.state.dialogAnimation.out(() => {
        this.setState({ dialogState: DIALOG_CLOSED }, this.props.onDismiss);
      });
    });
  }

  render() {
    const { dialogState, dialogAnimation } = this.state;
    const {
      rounded,
      dialogTitle,
      children,
      onTouchOutside,
      hasOverlay,
      dialogStyle,
      animationDuration,
      overlayOpacity,
      useNativeDriver,
      overlayBackgroundColor,
      containerStyle,
      footer,
    } = this.props;

    const overlayVisible = hasOverlay && [DIALOG_OPENING, DIALOG_OPENED].includes(dialogState);
    const round = rounded ? styles.round : null;
    const hidden = dialogState === DIALOG_CLOSED && styles.hidden;

    return (
      <View style={[styles.container, hidden, containerStyle]}>
        <Overlay
          pointerEvents={this.pointerEvents}
          visible={overlayVisible}
          onPress={onTouchOutside}
          backgroundColor={overlayBackgroundColor}
          opacity={overlayOpacity}
          animationDuration={animationDuration}
          useNativeDriver={useNativeDriver}
        />
        <Animated.View
          style={[
            styles.dialog,
            round,
            this.dialogSize,
            dialogStyle,
            dialogAnimation.getAnimations(),
          ]}
        >
          {dialogTitle}
          {children}
          {footer}
        </Animated.View>
      </View>
    );
  }
}

export default Dialog;
