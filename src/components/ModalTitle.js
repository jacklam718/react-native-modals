// @flow

import React from 'react';
import { View, Text, StyleSheet, Platform, PixelRatio } from 'react-native';
import { Positions } from '../constants/Constants';
import type { ModalTitleProps } from '../type';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  title: {
    padding: 14,
    paddingHorizontal: 18,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleBar: {
    borderBottomWidth: 1 / PixelRatio.get(),
    backgroundColor: '#F9F9FB',
    borderColor: '#DAD9DC',
  },
  text: {
    fontWeight: isAndroid ? '400' : '500',
    fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
    fontSize: isAndroid ? 19 : 15,
    color: '#151822',
  },
});

const ModalTitle = ({
  title,
  style,
  textStyle,
  hasTitleBar = true,
  align = 'center',
}: ModalTitleProps) => {
  const titleBar = hasTitleBar ? styles.titleBar : null;
  const titleAlign = { alignItems: Positions[align] };

  return (
    <View style={[styles.title, titleAlign, titleBar, style]}>
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </View>
  );
}

export default ModalTitle;
