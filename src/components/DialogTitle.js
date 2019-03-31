// @flow

import React from 'react';
import { View, Text, StyleSheet, Platform, PixelRatio } from 'react-native';
import { Positions } from '../constants/Constants';
import type { DialogTitleProps } from '../type';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  title: {
    padding: 24,
    paddingLeft: 18,
    paddingRight: 18,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleBar: {
    padding: 14,
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

function DialogTitle({
  title,
  style,
  textStyle,
  hasTitleBar,
  align,
}: DialogTitleProps) {
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

DialogTitle.defaultProps = {
  align: 'center',
  style: null,
  textStyle: null,
  hasTitleBar: true,
};

export default DialogTitle;
