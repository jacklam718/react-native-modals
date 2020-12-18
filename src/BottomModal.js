// @flow

import ModalPortal from './ModalPortal';
import Modal from './Modal';

class BottomModal extends Modal {
  show() {
    const { children, ...options } = this.props;
    this.id = ModalPortal.show(children, { ...options, type: 'bottomModal' });
  }
}

export default BottomModal;
