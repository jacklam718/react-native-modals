// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Dialog from './BaseModal';
import SlideAnimation from '../animations/SlideAnimation';
import type { ModalProps } from './type';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  modal: {
    width: '100%',
  },
});

export default function BottomModal({ style, modalStyle, ...restProps }: ModalProps) {
  return (
    <Dialog
      style={StyleSheet.flatten([styles.container, style])}
      modalStyle={StyleSheet.flatten([styles.modal, modalStyle])}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
      {...restProps}
    />
  );
}