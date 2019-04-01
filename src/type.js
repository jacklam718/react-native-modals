// @flow

import { type Element, type Node } from 'react';
import DialogButton from './components/DialogButton';

export type DialogProps = {
  visible: boolean;
  children: any;
  width?: number;
  height?: number;
  rounded?: boolean;
  hasOverlay?: boolean;
  overlayPointerEvents?: 'auto' | 'none';
  overlayBackgroundColor?: string;
  overlayOpacity?: number;
  dialogTitle?: Element<any>;
  dialogAnimation?: Object;
  dialogStyle?: any;
  containerStyle?: any;
  animationDuration?: number;
  onTouchOutside?: () => void;
  onHardwareBackPress?: () => boolean;
  onShow?: () => void;
  onDismiss?: () => void;
  footer?: Node;
  useNativeDriver?: boolean;
}

export type DialogFooterActionList = Array<Element<typeof DialogButton>>;

export type DialogFooterProps = {
  children: DialogFooterActionList;
  style?: any;
  bordered?: boolean;
}

export type DialogButtonProps = {
  text: string;
  onPress: () => void;
  align?: string;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  activeOpacity?: number;
  bordered?: boolean;
}

export type DialogTitleProps = {
  title: any;
  style?: any;
  textStyle?: any;
  align?: string;
  hasTitleBar?: boolean;
}

export type DialogContentProps = {
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
