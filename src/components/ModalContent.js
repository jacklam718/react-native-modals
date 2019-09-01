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
  }
});

function ModalContent({ style, children }: ModalContentProps) {
  return (
    <ModalContext.Consumer>
      {({ hasTitle }) => (
        <View style={[styles.content, style, hasTitle && styles.noPaddingTop]}>
          {children}
        </View>
      )}
    </ModalContext.Consumer>
  );
}

ModalContent.defaultProps = {
  style: null,
};

export default ModalContent;
