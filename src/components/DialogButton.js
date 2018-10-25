// @flow

import React from 'react';
import { Text, PixelRatio, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import { Positions } from '../constants/Constants';
import type { DialogButtonProps } from '../type';

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
  bordered: {
    borderLeftColor: '#CCD0D5',
    borderLeftWidth: 1 / PixelRatio.get(),
  },
  text: {
    fontWeight: isAndroid ? '400' : '500',
    fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
    fontSize: isAndroid ? 19 : 16,
    color: '#044DE0',
  },
  disabledText: {
    color: '#C5C6C5',
  },
  textContainer: {
    minWidth: 48,
    // paddingHorizontal: 16,
    // paddingVertical: 16,
    // borderRadius: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

/* eslint max-len: [0] */
function DialogButton({
  text,
  activeOpacity,
  disabled,
  align,
  onPress,
  buttonStyle,
  textStyle,
  bordered,
}: DialogButtonProps) {
  const buttonAlign = { alignSelf: Positions[align] };
  const disabledText = disabled ? styles.disabledText : null;
  const dynamicStyles = bordered ? styles.bordered : null;

  return (
    <TouchableHighlight
      underlayColor="#F1F2F2"
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[styles.button, buttonAlign, dynamicStyles, buttonStyle]}
    >
      <Text style={[styles.text, disabledText, textStyle]}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}

DialogButton.defaultProps = {
  activeOpacity: 0.6,
  disabled: false,
  bordered: false,
  align: 'center',
  buttonStyle: null,
  textStyle: null,
};

export default DialogButton;
