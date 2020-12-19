// @flow

import { type Element, type Node } from 'react';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'

export type DragEvent = {
  axis: {
    x: number;
    y: number;
  },
  layout: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  swipeDirection: string | null;
}

export type ModalProps = {
  visible?: boolean;
  children?: any;
  width?: number;
  height?: number;
  rounded?: boolean;
  hasOverlay?: boolean;
  overlayPointerEvents?: 'auto' | 'none';
  overlayBackgroundColor?: string;
  overlayOpacity?: number;
  modalTitle?: any;
  modalAnimation?: Object;
  modalStyle?: any;
  style?: any;
  animationDuration?: number;
  onTouchOutside?: () => void;
  onHardwareBackPress?: () => boolean;
  onShow?: () => void;
  onDismiss?: () => void;
  footer?: Node;
  onMove?: (event: DragEvent) => void,
  onSwiping?: (event :DragEvent) => void,
  onSwipeRelease?: (event: DragEvent) => void,
  onSwipingOut?: (event: DragEvent) => void,
  onSwipeOut?: (event: DragEvent) => void,
  swipeDirection?: SwipeDirection | Array<SwipeDirection>;
  swipeThreshold?: number;
  useNativeDriver?: boolean;
}

export type ModalFooterProps = {
  children?: any;
  style?: any;
  bordered?: boolean;
}

export type ModalButtonProps = {
  text: string;
  onPress?: () => void;
  align?: string;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  activeOpacity?: number;
  bordered?: boolean;
}

export type ModalTitleProps = {
  title: any;
  style?: any;
  textStyle?: any;
  align?: string;
  hasTitleBar?: boolean;
}

export type ModalContentProps = {
  children: any,
  style?: any,
}

export type BackdropProps = {
  visible: boolean;
  opacity: number;
  onPress?: () => void;
  backgroundColor?: string;
  animationDuration?: number;
  pointerEvents?: string;
  useNativeDriver?: boolean;
}
