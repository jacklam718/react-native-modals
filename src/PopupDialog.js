// @flow

import React, { Component } from 'react';
import { Modal } from 'react-native';
import Dialog from './components/Dialog';
import type { DialogProps } from './type';

export default class PopupDialog extends Component<DialogProps, State> {
  static defaultProps = {
    visible: false,
    onHardwareBackPress: () => false,
  }

  render() {
    const { onHardwareBackPress, visible, ...dialogProps } = this.props;

    return (
      <Modal onRequestClose={onHardwareBackPress} transparent visible={visible}>
        <Dialog visible={visible} {...dialogProps} />
      </Modal>
    );
  }
}
