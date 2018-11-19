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
import DialogActionList from './DialogActionList';
import type { DialogProps } from '../type';
import FadeAnimation from '../animations/FadeAnimation';
import ScaleAnimation from '../animations/ScaleAnimation';
import SlideAnimation from '../animations/SlideAnimation';

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
  dialogAnimation: FadeAnimation | ScaleAnimation | SlideAnimation;
  dialogState: DialogState
}

class Dialog extends Component<DialogProps, State> {
  static defaultProps = {
    rounded: true,
    dialogTitle: null,
    visible: false,
    containerStyle: null,
    actionContainerStyle: null,
    actionsBordered: true,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    dialogStyle: null,
    width: null,
    height: null,
    onTouchOutside: () => {},
    onHardwareBackPress: () => true,
    hasOverlay: true,
    overlayOpacity: 0.5,
    overlayPointerEvents: null,
    overlayBackgroundColor: '#000',
    onShow: () => {},
    onDismiss: () => {},
    actions: null,
    useNativeDriver: true,
  }

  constructor(props: DialogProps) {
    super(props);

    this.state = {
      dialogAnimation: props.dialogAnimation || new FadeAnimation({ animationDuration: props.animationDuration }),
      dialogState: DIALOG_CLOSED,
    };
  }

  componentDidMount() {
    const { visible, onHardwareBackPress } = this.props;
    if (visible) {
      this.show();
    }
    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, onHardwareBackPress);
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
    const { onHardwareBackPress } = this.props;
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT, onHardwareBackPress);
  }

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

  setDialogState(toValue: number, callback?: Function = () => {}): void {
    const { dialogAnimation } = this.state;
    const { animationDuration } = this.props;
    let dialogState = toValue ? DIALOG_OPENING : DIALOG_CLOSING;

    dialogAnimation.toValue(toValue);
    this.setState({ dialogState });

    setTimeout(() => {
      dialogState = dialogState === DIALOG_CLOSING ? DIALOG_CLOSED : DIALOG_OPENED;
      this.setState({ dialogState }, callback);
    }, animationDuration);
  }

  show = (): void => {
    const { onShow } = this.props;
    if (![DIALOG_OPENING, DIALOG_OPENED].includes(this.state.dialogState)) {
      this.setDialogState(1, onShow);
    }
  }

  dismiss = (): void => {
    const { onDismiss } = this.props;
    if (![DIALOG_CLOSING, DIALOG_CLOSED].includes(this.state.dialogState)) {
      this.setDialogState(0, onDismiss);
    }
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
      actionsBordered,
      actionContainerStyle,
      actions,
    } = this.props;

    const overlayVisible = hasOverlay && [DIALOG_OPENING, DIALOG_OPENED].includes(dialogState);
    const round = rounded ? styles.round : null;
    const hidden = dialogState === DIALOG_CLOSED && styles.hidden;

    const buttons = actions ? (
      <DialogActionList style={actionContainerStyle} bordered={actionsBordered}>
        {actions}
      </DialogActionList>
    ) : null;

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
            dialogAnimation.animations,
          ]}
        >
          {dialogTitle}
          {children}
          {buttons}
        </Animated.View>
      </View>
    );
  }
}

export default Dialog;
