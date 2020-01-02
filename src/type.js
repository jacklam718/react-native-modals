// @flow

import React from 'react';
import { Text, PixelRatio, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import { Positions } from './constants/Constants';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  border: {
    borderLeftColor: '#CCD0D5',
    borderLeftWidth: 1 / PixelRatio.get(),
  },
  text: {
    fontWeight: isAndroid ? '400' : '500',
    fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
    fontSize: isAndroid ? 19 : 16,
    color: '#044DE0',
  },
  disable: {
    color: '#C5C6C5',
  },
});

const ModalButton = ({
  text,
  onPress,
  style,
  textStyle,
  activeOpacity = 0.6,
  align = 'center',
  disabled = false,
  bordered = false,
}: ModalButtonProps) => {
  const buttonAlign = { alignSelf: Positions[align] };
  const disable = disabled ? styles.disable : null;
  const border = bordered ? styles.border : null;

  return (
    <TouchableHighlight
      underlayColor="#F1F2F2"
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[styles.button, buttonAlign, border, style]}
    >
      <Text style={[styles.text, disable, textStyle]}>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default ModalButton;

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
  onMove?: (event: DragEvent) => void,
  onSwiping?: (event :DragEvent) => void,
  onSwipeRelease?: (event: DragEvent) => void,
  onSwipingOut?: (event: DragEvent) => void,
  onSwipeOut?: (event: DragEvent) => void,
  swipeDirection?: SwipeDirection | Array<SwipeDirection>;
  swipeThreshold?: number;
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

export type BackdropProps = {
  visible: boolean;
  opacity: number;
  onPress?: () => void;
  backgroundColor?: string;
  animationDuration?: number;
  pointerEvents?: string;
  useNativeDriver?: boolean;
}
