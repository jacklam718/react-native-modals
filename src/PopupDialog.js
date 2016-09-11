// flow

import React, { PropTypes, Component, Element } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Dialog from './components/Dialog';
import Overlay from './components/Overlay';
import ScaleAnimation from './animations/ScaleAnimation';

const SCRREN_WIDTH = Dimensions.get('window').width;
const SCRREN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
  animation: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  overlayBackgroundColor: PropTypes.string,
  overlayOpacity: PropTypes.number,
  dialogAnimation: PropTypes.object,
  animationDuration: PropTypes.number,
  closeOnTouchOutside: PropTypes.bool,
  open: PropTypes.bool,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  children: PropTypes.any,
};

const defaultProps = {
  animation: 'scale',
  animationDuration: 200,
  closeOnTouchOutside: true,
};

class PopupDialog extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props);

    // get animation from props or create animation from Animtion modules
    if (props.dialogAnimation) {
      this.dialogAnimation = props.dialogAnimation;
    } else if (props.animation === 'scale') {
      this.dialogAnimation = new ScaleAnimation();
    }

    // opened, opening, closed, closing,
    this.state = {
      dialogState: 'closed',
    };

    this.onOverlayPress = this.onOverlayPress.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      this.openDialog(this.props.onOpened);
    } else {
      this.closeDialog(this.props.onClosed);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        return this.openDialog(this.nextProps.onOpened);
      }
      return this.closeDialog(this.nextProps.onClosed);
    }
    return nextProps;
  }

  onOverlayPress() {
    this.closeDialog();
  }

  setDialogState(toValue, callback) {
    this.dialogAnimation.toValue(toValue);
    let dialogState = toValue ? 'opening' : 'closing';

    this.setState({ dialogState });

    setTimeout(() => {
      dialogState = dialogState === 'closing' ? 'closed' : 'opened';
      this.setState({ dialogState });
      if (callback) callback();
    }, this.props.animationDuration);
  }

  openDialog(onOpened = this.props.onOpened) {
    this.setDialogState(1, onOpened);
  }

  closeDialog(onClosed = this.props.onClosed) {
    this.setDialogState(0, onClosed);
  }

  render() {
    let hidden;
    let dialog;

    const dialogShow = ['opened', 'opening'].includes(this.state.dialogState);

    if (dialogShow || this.state.dialogState !== 'closed') {
      dialog = (
        <Dialog
          width={this.props.width}
          height={this.props.height}
          animations={this.dialogAnimation.animations}
        >
          {this.props.children}
        </Dialog>
      );
    } else if (this.state.dialogState === 'closed') {
      hidden = styles.hidden;
    }

    return (
      <View style={[styles.popupContainer, hidden]}>
        <Overlay
          showOverlay={dialogShow}
          onPress={this.onOverlayPress}
          backgroundColor={this.props.overlayBackgroundColor}
          opacity={this.props.overlayOpacity}
          animationDuration={this.props.animationDuration}
        />
        {dialog}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
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
