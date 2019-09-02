// @flow

import React from 'react';
import { Text, PixelRatio, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import { Positions } from '../constants/Constants';
import type { ModalButtonProps } from '../type';

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
