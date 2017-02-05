// @flow

import React, { Component } from 'react';
import Dialog from './components/Dialog';

type Props = {
  dialogTitle: any;
  children: any;
};

class PopupDialog extends Component {
  props: Props;

  openDialog(onOpened: Function) {
    this.dialog.open(onOpened);
  }

  closeDialog(onClosed: Function) {
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
