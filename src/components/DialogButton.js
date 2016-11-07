// @flow

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Positions } from '../constants/Constants';

const isAndroid = Platform.OS === 'android';

type Param = {
  text: string,
  align: string,
  onPress: Function,
  buttonStyle: Object | number,
  textStyle: Object | number,
  textContainerStyle: Object | number,
  disabled: Boolean,
  activeOpacity: number,
};

/* eslint max-len: [0]*/
function DialogButton({ text, activeOpacity, disabled = false, align = 'center', onPress, buttonStyle, textStyle, textContainerStyle }: Param) {
  const buttonAlign = { alignSelf: Positions[align] };
  const disabledText = disabled ? styles.disabledText : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[styles.button, buttonAlign, buttonStyle]}
    >
      <View style={[styles.textContainer, textContainerStyle]}>
        <Text style={[styles.text, disabledText, textStyle]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
  },
  text: {
    fontWeight: isAndroid ? '400' : '500',
    fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
    fontSize: isAndroid ? 19 : 18,
  },
  disabledText: {
    color: '#C5C6C5',
  },
  textContainer: {
    minWidth: 48,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DialogButton;
