// @flow

import React, { Component } from 'react';
import Dialog from './components/Dialog';

type Props = {
  dialogTitle: any;
  children: any;
  animationDuration: number;
};

const DefaultProps = {
  animationDuration: 200,
};

class PopupDialog extends Component {
  props: Props;
  static defaultProps = DefaultProps;

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
