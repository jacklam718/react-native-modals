// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Positions } from '../constants/Constants';

import type { DialogTitleType } from '../type';

const styles = StyleSheet.create({
  title: {
    padding: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleBar: {
    padding: 14,
    borderBottomWidth: 0.5,
    backgroundColor: '#F9F9FB',
    borderColor: '#DAD9DC',
  },
  titleText: {
    color: '#7F7D89',
    fontSize: 16,
  },
});

function DialogTitle({
  title,
  titleStyle,
  titleTextStyle,
  hasTitleBar,
  titleAlign,
}: DialogTitleType) {
  const titleBar = hasTitleBar ? styles.titleBar : null;
  const titleItemsAlign = { alignItems: Positions[titleAlign] };

  return (
    <View style={[styles.title, titleItemsAlign, titleBar, titleStyle]}>
      <Text style={[styles.titleText, titleTextStyle]}>
        {title}
      </Text>
    </View>
  );
}

DialogTitle.defaultProps = {
  titleAlign: 'center',
  hasTitleBar: true,
};

export default DialogTitle;
