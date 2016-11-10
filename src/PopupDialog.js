/* @flow */

import React, { Component, PropTypes } from 'react';
import Dialog from './components/Dialog';
import DefaultAnimation from './animations/DefaultAnimation';

const propTypes = {
  ...Dialog.propTypes,
  dialogTitle: PropTypes.element,
};

const defaultProps = {
  animationDuration: 200,
  closeOnTouchOutside: true,
  dialogAnimation: new DefaultAnimation({ animationDuration: 150 }),
};

class PopupDialog extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  openDialog(onOpened) {
    this.dialog.open(onOpened);
  }

  closeDialog(onClosed) {
    this.dialog.close(onClosed);
  }

  render() {
    return (
      <Dialog
        ref={_dialog => { this.dialog = _dialog; }}
        {...this.props}
      >
        {this.props.dialogTitle}
        {this.props.children}
      </Dialog>
    );
  }
}

export default PopupDialog;
