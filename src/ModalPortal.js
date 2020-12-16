import React from 'react';
import BaseModal from './components/BaseModal';
import BottomModal from './components/BottomModal';
import AbstractPortal from './AbstractPortal';

class ModalPortal extends AbstractPortal {
  renderModal = ({ type = 'modal', ...props }) => {
    if (type === 'modal') {
      return (
        <BaseModal
          {...props}
          onDismiss={() => this.dismissHandler(props.key)}
        />
      );
    } else if (type === 'bottomModal') {
      return (
        <BottomModal
          {...props}
          onDismiss={() => this.dismissHandler(props.key)}
        />
      );
    }
  }

  render() {
    return this.state.stack.map(this.renderModal);
  }
}

export default ModalPortal;