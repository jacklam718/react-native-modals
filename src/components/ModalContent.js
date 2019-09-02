// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModalContext from './ModalContext';
import type { ModalContentProps } from '../type';

const styles = StyleSheet.create({
  content: {
    paddingVertical: 24,
    paddingHorizontal: 18,
  },
  noPaddingTop: {
    paddingTop: 0,
  },
});

const ModalContent = ({
  style,
  children,
}: ModalContentProps) => (
  <ModalContext.Consumer>
    {({ hasTitle }) => (
      <View style={[styles.content, hasTitle && styles.noPaddingTop, style]}>
        {children}
      </View>
    )}
  </ModalContext.Consumer>
);

export default ModalContent;
