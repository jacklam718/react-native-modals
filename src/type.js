// @flow

import { type Element, type Node } from 'react';
import ModalButton from './components/ModalButton';

export type ModalProps = {
  visible: boolean;
  children: any;
  width?: number;
  height?: number;
  rounded?: boolean;
  hasOverlay?: boolean;
  overlayPointerEvents?: 'auto' | 'none';
  overlayBackgroundColor?: string;
  overlayOpacity?: number;
  modalTitle?: Element<any>;
  modalAnimation?: Object;
  modalStyle?: any;
  style?: any;
  animationDuration?: number;
  onTouchOutside?: () => void;
  onHardwareBackPress?: () => boolean;
  onShow?: () => void;
  onDismiss?: () => void;
  footer?: Node;
  useNativeDriver?: boolean;
}

export type ModalFooterActionList = Array<Element<typeof ModalButton>>;

export type modalFooterProps = {
  children: ModalFooterActionList;
  style?: any;
  bordered?: boolean;
}

export type ModalButtonProps = {
  text: string;
  onPress: () => void;
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

export type OverlayProps = {
  visible: boolean;
  opacity: number;
  onPress?: () => void;
  backgroundColor?: string;
  animationDuration?: number;
  pointerEvents?: string;
  useNativeDriver?: boolean;
}
