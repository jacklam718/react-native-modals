// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import type { ModalProps } from '../type';
import SlideAnimation from '../animations/SlideAnimation';
import Modal from './Modal';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  modal: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

const BottomModal = ({
  style,
  modalStyle,
  ...restProps
}: ModalProps) => (
  <Modal
    modalAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    {...restProps}
    style={StyleSheet.flatten([styles.container, style])}
    modalStyle={StyleSheet.flatten([styles.modal, modalStyle])}
    width={1}
    swipeDirection="down"
  />
);

export default BottomModal;
