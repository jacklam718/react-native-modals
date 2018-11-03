// @flow

import { type Element } from 'react';
import DialogButton from './components/DialogButton';

export type ActionList = Array<Element<DialogButton>>;

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
  actionContainerStyle?: any;
  actionsBordered?: boolean;
  animationDuration?: number;
  onTouchOutside?: () => void;
  onHardwareBackPress?: () => boolean;
  onShow?: () => void;
  onDismiss?: () => void;
  actions?: ActionList;
  useNativeDriver?: boolean;
}

export type DialogActionListProps = {
  children: ActionList;
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
