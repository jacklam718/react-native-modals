import React from 'react';
import BaseModal from './components/BaseModal';
import BottomModal from './components/BottomModal';

let modal
class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stack: [] };
    this.id = 0;
    modal = this;
  }

  static get ref() {
    return modal;
  }

  static get size() {
    return modal.state.stack.length;
  }

  static show(children, props) {
    return modal.show({ children, ...props });
  }

  static update(key, props) {
    modal.update(key, props);
  }

  static dismiss(key) {
    modal.dismiss(key);
  }

  static dismissAll() {
    modal.dismissAll();
  }

  get current() {
    if (this.state.stack.length) {
      return this.state.stack[this.state.stack.length-1].key;
    }
  }

  generateKey = () => `modal-${this.id++}`

  getIndex = key => this.state.stack.findIndex(i => i.key === key)

  getProps = (props) => {
    const key = props.key || this.generateKey();
    return { visible: true, ...props, key };
  }

  show = (props) => {
    const mergedProps = this.getProps(props);
    this.setState(({ stack }) => {
      return { stack: stack.concat(mergedProps) };
    });
    return mergedProps.key;
  }

  update = (key, props) => {
    const mergedProps = this.getProps({ ...props, key });
    this.setState(({ stack }) => {
      const index = this.getIndex(key);
      stack[index] = { ...stack[index], ...mergedProps };
      return { stack };
    });
  }

  dismiss = (key = this.current) => {
    if (!key) return;
    const props = { ...this.state.stack[this.getIndex(key)], visible: false };
    this.update(key, props);
  }

  dismissAll = () => this.state.stack.forEach(({ key }) => this.dismiss(key));

  dismissHandler = (key) => {
    // dismiss hander: which will remove data from stack and call onDismissed callback
    const { onDismiss = () => {} } = this.state.stack[this.getIndex(key)];
    this.setState(({ stack }) => {
      return { stack: stack.filter(i => i.key !== key) };
    }, onDismiss);
  }

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