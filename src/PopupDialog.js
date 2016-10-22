// flow

import React, { Component } from 'react';
import Dialog from './components/Dialog';
import ActionsDialog from './components/ActionsDialog';
import DialogTitle from './components/DialogTitle';
import ScaleAnimation from './animations/ScaleAnimation';

const propTypes = {
  ...{
    ...Dialog.propTypes,
    ...ActionsDialog.propTypes,
  },
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
    let dialog;

    if (this.props.actions) {
      dialog = (
        <ActionsDialog
          ref={_dialog => { this.dialog = _dialog; }}
          {...this.props}
        >
          {title}
          {this.props.children}
        </ActionsDialog>
      );
    } else {
      dialog = (
        <Dialog
          ref={_dialog => { this.dialog = _dialog; }}
          {...this.props}
        >
          {title}
          {this.props.children}
        </Dialog>
      );
    }

    return dialog;
  }
}

export default PopupDialog;
