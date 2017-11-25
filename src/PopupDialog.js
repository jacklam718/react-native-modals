// @flow

import React, { Component } from 'react';
import Dialog from './components/Dialog';
import type { PopupDialogType } from './type';

class PopupDialog extends Component {
  props: PopupDialogType;

  dialog: Object

  show(onShown: ?Function) {
    this.dialog.show(onShown);
  }

  dismiss(onDismissed: ?Function) {
    this.dialog.dismiss(onDismissed);
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
