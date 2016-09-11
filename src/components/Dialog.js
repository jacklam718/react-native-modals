// flow

import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Overlay from './Overlay';

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
  width: SCRREN_WIDTH,
  height: 300,
  closeOnTouchOutside: true,
};

class Dialog extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props);

    // get animation from props
    if (props.dialogAnimation) {
      this.dialogAnimation = props.dialogAnimation;
    }

    // opened, opening, closed, closing,
    this.state = {
      dialogState: 'closed',
    };

    this.onOverlayPress = this.onOverlayPress.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      this.open(this.props.onOpened);
    } else {
      this.close(this.props.onClosed);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        return this.open(this.nextProps.onOpened);
      }
      return this.close(this.nextProps.onClosed);
    }
    return nextProps;
  }

  onOverlayPress() {
    this.close();
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

  open(onOpened = this.props.onOpened) {
    this.setDialogState(1, onOpened);
  }

  close(onClosed = this.props.onClosed) {
    this.setDialogState(0, onClosed);
  }

  getDialogSize({ width, height }): Object {
    const size = { width, height };
    if (width > 0.0 && width < 1.0) {
      size.width = width * SCRREN_WIDTH;
    }
    if (height > 0.0 && height < 1.0) {
      size.height = height * SCRREN_HEIGHT;
    }
    return size;
  }

  render() {
    let hidden;
    let dialog;

    const dialogState = this.state.dialogState;

    if (dialogState === 'closed') {
      hidden = styles.hidden;
    } else {
      const size = this.getDialogSize(this.props);
      let backgroundColor;
      if (this.props.children) {
        if (this.props.children.props.style) {
          backgroundColor = { backgroundColor: this.props.children.props.style.backgroundColor };
        }
      }

      dialog = (
        <Animated.View style={[styles.dialog, size, this.dialogAnimation.animations]} >
          {this.props.children}
        </Animated.View>
      );
    }

    return (
      <View style={[styles.popupContainer, hidden]}>
        <Overlay
          showOverlay={['opened', 'opening'].includes(dialogState)}
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
  },
  dialog: {
    borderRadius: 8,
    // padding: 5,
    backgroundColor: '#ffffff',
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
});

export default Dialog;
