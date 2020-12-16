// @flow

import React from 'react';
import ModalPortal from './ModalPortal';

class Portal extends ModalPortal {}

class Modal extends React.Component {
  constructor(props: ModalProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.visible) {
      this.createModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        this.createModal();
      }
    }
    // always re-render
    if (this.id) {
      this.updateModal();
    }
  }

  handleDismiss = () => {
    const { onDismiss } = this.props;
    if (onDismiss) {
      onDismiss();
    }
    this.id = null;
  }

  createModal() {
    const { children, ...props } = this.props;
    if (!this.id) {
      this.id = Portal.show(children, {
        ...props,
        onDismiss: () => this.handleDismiss(),
      });
    }
  }

  updateModal() {
    Portal.update(this.id, {
      ...this.props,
      onDismiss: () => this.handleDismiss(),
    });
  }

  render() {
    return <Portal />;
  }
}

Modal.defaultProps = {
  type: 'modal',
};

export default Modal;