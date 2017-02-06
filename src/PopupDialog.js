// @flow

import React, { Component } from 'react';
import Dialog from './components/Dialog';

import type { PopupDialogType } from './Type';

class PopupDialog extends Component {
  props: PopupDialogType;

  dialog: Object

  openDialog(onOpened: ?Function) {
    this.dialog.open(onOpened);
  }

  closeDialog(onClosed: ?Function) {
    this.dialog.close(onClosed);
  }

  render() {
    return (
      <Dialog
        ref={(dialog) => { this.dialog = dialog; }}
        {...this.props}
      >
        {this.props.dialogTitle}
        {this.props.children}
      </Dialog>
    );
  }
}

export default PopupDialog;
