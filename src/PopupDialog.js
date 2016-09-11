// flow

import React, { PropTypes, Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Dialog from './components/Dialog';
import DialogTitle from './components/DialogTitle';
import ScaleAnimation from './animations/ScaleAnimation';

const SCRREN_WIDTH = Dimensions.get('window').width;
const SCRREN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
  ...Dialog.propTypes,
  ...DialogTitle.propTypes,
};

const defaultProps = {
  animation: 'scale',
  animationDuration: 200,
  closeOnTouchOutside: true,
  dialogAnimation: new ScaleAnimation(),
};

class PopupDialog extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  openDialog(onOpened) {
    this.dialog.open(onOpened);
  }

  closeDialog(onClosed) {
    this.dialog.closed(onClosed);
  }

  render() {
    let title;

    if (this.props.title) {
      title = <DialogTitle {...this.props} />;
    }


    return (
      <Dialog
        ref={(dialog) => { this.dialog = dialog; }}
        {...this.props}
      >
        {title}
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCRREN_WIDTH,
    height: SCRREN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
});

export default PopupDialog;
