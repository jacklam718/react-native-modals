// @flow

import React, { Component } from 'react';
import Sibling from 'react-native-root-siblings';
import BaseModal from './components/BaseModal';
import type { ModalProps } from './type';

type State = {
  visible: boolean
}

export default class Modal extends Component<ModalProps, State> {
  constructor(props: ModalProps) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  componentDidMount() {
    const { visible } = this.state;
    if (visible) {
      this.createModal();
    }
  }

  componentDidUpdate(prevProps: ModalProps, prevState: State) {
    // update visible state and create dialog if visible is true
    if (prevState.visible !== this.props.visible) {
      // will use getDerivedStateFromProps in future, then don't need to setState
      // on componentDidUpdate
      // eslint-disable-next-line
      this.setState({ visible: this.props.visible });
      if (this.props.visible) {
        this.createModal();
      }
    }
    // always re-render if sibling is not null
    if (this.sibling) {
      this.updateModal();
    }
  }

  handleDismiss = () => {
    const { onDismiss } = this.props;
    if (onDismiss) {
      onDismiss();
    }
    this.destroyModal();
  }

  sibling: Sibling = null

  createModal() {
    // Protect against setState happening asynchronously
    if (!this.sibling) {
      this.sibling = new Sibling(this.renderModal());
    }
  }

  updateModal() {
    this.sibling.update(this.renderModal());
  }

  destroyModal() {
    this.sibling.destroy();
    this.sibling = null;
  }

  renderModal() {
    return (
      <BaseModal
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
