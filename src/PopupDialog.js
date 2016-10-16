// flow

import React, { Component } from 'react';
import Dialog from './components/Dialog';
import DialogTitle from './components/DialogTitle';
import ScaleAnimation from './animations/ScaleAnimation';

const propTypes = {
  ...Dialog.propTypes,
  ...DialogTitle.propTypes,
};

const defaultProps = {
  animationDuration: 200,
  closeOnTouchOutside: true,
  dialogAnimation: new ScaleAnimation(),
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
    const title = this.props.title ? <DialogTitle {...this.props} /> : null;

    return (
      <Dialog
        ref={dialog => { this.dialog = dialog; }}
        {...this.props}
      >
        {title}
        {this.props.children}
      </Dialog>
    );
  }
}

export default PopupDialog;
