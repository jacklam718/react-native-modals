// @flow

import React, { Component } from 'react';
import Sibling from 'react-native-general-siblings';
import Dialog from './components/Dialog';
import type { DialogProps } from './type';

type State = {
  visible: boolean
}

export default class PopupDialog extends Component<DialogProps, State> {
  state = {
    visible: false,
  }

  componentDidUpdate(prevProps: DialogProps, prevState: State) {
    if (prevState.visible !== this.props.visible) {
      // will use getDerivedStateFromProps in future, then don't need to setState
      // on componentDidUpdate
      // eslint-disable-next-line
      this.setState({ visible: this.props.visible });
      if (this.props.visible) {
        this.createDialog();
        return;
      }
      this.updateDialog();
    }
  }

  handleDismiss = () => {
    const { onDismiss } = this.props;
    if (onDismiss) {
      onDismiss();
    }
    this.destroyDialog();
  }

  sibling: Sibling = null

  createDialog() {
    this.sibling = new Sibling(this.renderDialog());
  }

  updateDialog() {
    this.sibling.update(this.renderDialog());
  }

  destroyDialog() {
    this.sibling.destroy();
  }

  renderDialog() {
    return (
      <Dialog
        {...this.props}
        onDismiss={this.handleDismiss}
        visible={this.state.visible}
      />
    );
  }

  render() {
    return null;
  }
}
