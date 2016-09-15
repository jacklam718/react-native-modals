// flow

import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Overlay from './Overlay';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

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
  width: WIDTH,
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        return this.open(nextProps.onOpened);
      }
      return this.close(nextProps.onClosed);
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
      if (callback && typeof callback === 'function') callback();
    }, this.props.animationDuration);
  }

  getDialogSize({ width, height }): Object {
    const size = { width, height };
    if (width > 0.0 && width < 1.0) {
      size.width = width * WIDTH;
    }
    if (height > 0.0 && height < 1.0) {
      size.height = height * HEIGHT;
    }
    return size;
  }

  open(onOpened = this.props.onOpened) {
    this.setDialogState(1, onOpened);
  }

  close(onClosed = this.props.onClosed) {
    this.setDialogState(0, onClosed);
  }

  render() {
    let hidden;
    let dialog;
    const dialogState = this.state.dialogState;

    if (dialogState === 'closed') {
      hidden = styles.hidden;
    } else {
      const size = this.getDialogSize(this.props);
      dialog = (
        <Animated.View style={[styles.dialog, size, this.dialogAnimation.animations]}>
          {this.props.children}
        </Animated.View>
      );
    }

    return (
      <View style={[styles.container, hidden]}>
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
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    padding: 10,
    borderRadius: 8,
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
