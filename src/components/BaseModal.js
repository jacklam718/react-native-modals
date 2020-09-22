// @flow

import React, { Fragment, Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  BackAndroid as RNBackAndroid,
  BackHandler as RNBackHandler,
} from 'react-native';

import DraggableView from './DraggableView';
import ModalContext from './ModalContext';
import Backdrop from './Backdrop';
import type { ModalProps } from '../type';
import Animation from '../animations/Animation';
import FadeAnimation from '../animations/FadeAnimation';

const BackHandler = RNBackHandler || RNBackAndroid;

// dialog states
const MODAL_OPENING: string = 'opening';
const MODAL_OPENED: string = 'opened';
const MODAL_CLOSING: string = 'closing';
const MODAL_CLOSED: string = 'closed';

// default dialog config
const DEFAULT_ANIMATION_DURATION: number = 150;

// event types
const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 10,
  },
  modal: {
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
  draggableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ModalState =
 | typeof MODAL_OPENING
 | typeof MODAL_OPENED
 | typeof MODAL_CLOSING
 | typeof MODAL_CLOSED

type State = {
  modalAnimation: Animation;
  modalState: ModalState;
}

class BaseModal extends Component<ModalProps, State> {
  static defaultProps = {
    rounded: true,
    modalTitle: null,
    visible: false,
    style: null,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    modalStyle: null,
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
    onMove: () => {},
    onSwiping: () => {},
    onSwipeRelease: () => {},
    onSwipingOut: () => {},
    useNativeDriver: true,
  }

  constructor(props: ModalProps) {
    super(props);

    this.state = {
      modalAnimation: props.modalAnimation || new FadeAnimation({
        animationDuration: props.animationDuration,
      }),
      modalState: MODAL_CLOSED,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.onHardwareBackPress);
  }

  componentDidUpdate(prevProps: ModalProps) {
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
    const { modalState } = this.state;
    if (overlayPointerEvents) {
      return overlayPointerEvents;
    }
    return modalState === MODAL_OPENED ? 'auto' : 'none';
  }

  get modalSize(): Object {
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
    this.setState({ modalState: MODAL_OPENING }, () => {
      this.state.modalAnimation.in(() => {
        this.setState({ modalState: MODAL_OPENED }, this.props.onShow);
      });
    });
  }

  dismiss(): void {
    this.setState({ modalState: MODAL_CLOSING }, () => {
      if (this.isSwipingOut) {
        this.setState({ modalState: MODAL_CLOSED }, this.props.onDismiss);
        return;
      }
      this.state.modalAnimation.out(() => {
        this.setState({ modalState: MODAL_CLOSED }, this.props.onDismiss);
      });
    });
  }

  handleMove = (event): void => {
    // prevent flashing when modal is closing and onMove callback invoked
    if (this.state.modalState === MODAL_CLOSING) {
      return;
    }
    if (!this.lastSwipeEvent) {
      this.lastSwipeEvent = event;
    }
    let newOpacity;
    const opacity = this.props.overlayOpacity;
    if (Math.abs(event.axis.y)) {
      const lastAxis = Math.abs(this.lastSwipeEvent.layout.y);
      const currAxis = Math.abs(event.axis.y);
      newOpacity = opacity - ((opacity * currAxis) / (Dimensions.get('window').height - lastAxis));
    } else {
      const lastAxis = Math.abs(this.lastSwipeEvent.layout.x);
      const currAxis = Math.abs(event.axis.x);
      newOpacity = opacity - ((opacity * currAxis) / (Dimensions.get('window').width - lastAxis));
    }
    this.backdrop.setOpacity(newOpacity);
  }

  handleSwipingOut = (event) => {
    this.isSwipingOut = true;
    this.props.onSwipingOut(event);
  }

  render() {
    const { modalState, modalAnimation } = this.state;
    const {
      rounded,
      modalTitle,
      children,
      onTouchOutside,
      hasOverlay,
      modalStyle,
      animationDuration,
      overlayOpacity,
      useNativeDriver,
      overlayBackgroundColor,
      style,
      footer,
      onSwiping,
      onSwipeRelease,
      onSwipeOut,
      swipeDirection,
      swipeThreshold,
    } = this.props;

    const overlayVisible = hasOverlay && [MODAL_OPENING, MODAL_OPENED].includes(modalState);
    const round = rounded ? styles.round : null;
    const hidden = modalState === MODAL_CLOSED && styles.hidden;

    return (
      <ModalContext.Provider
        value={{
          hasTitle: !!modalTitle,
          basFooter: !!footer,
        }}
      >
        <View style={[styles.container, hidden]}>
          <DraggableView
            style={StyleSheet.flatten([styles.draggableView, style])}
            onMove={this.handleMove}
            onSwiping={onSwiping}
            onRelease={onSwipeRelease}
            onSwipingOut={this.handleSwipingOut}
            onSwipeOut={onSwipeOut}
            swipeDirection={swipeDirection}
            swipeThreshold={swipeThreshold}
          >
            {({ pan, onLayout }) => (
              <Fragment>
                <Backdrop
                  ref={(ref) => {
                    this.backdrop = ref;
                  }}
                  pointerEvents={this.pointerEvents}
                  visible={overlayVisible}
                  onPress={onTouchOutside}
                  backgroundColor={overlayBackgroundColor}
                  opacity={overlayOpacity}
                  animationDuration={animationDuration}
                  useNativeDriver={useNativeDriver}
                />
                <Animated.View
                  style={pan.getLayout()}
                  onLayout={onLayout}
                >
                  <Animated.View
                    style={[
                      styles.modal,
                      round,
                      this.modalSize,
                      modalStyle,
                      modalAnimation.getAnimations(),
                    ]}
                  >
                    {modalTitle}
                    {children}
                    {footer}
                  </Animated.View>
                </Animated.View>
              </Fragment>
            )}
          </DraggableView>
        </View>
      </ModalContext.Provider>
    );
  }
}

export default BaseModal;
