// @flow

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import type { OverlayType } from '../type';

// default overlay options
const BACKGROUND_COLOR: string = '#000';
const OPACITY: number = 0.5;
const ANIMATION_DURATION: number = 2000;
const SHOW_OVERLAY: boolean = false;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
  },
});

class Overlay extends Component {
  static defaultProps = {
    backgroundColor: BACKGROUND_COLOR,
    opacity: OPACITY,
    animationDuration: ANIMATION_DURATION,
    showOverlay: SHOW_OVERLAY,
    useNativeDriver: true,
  };

  constructor(props: OverlayType) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps: OverlayType) {
    const {
      showOverlay,
      useNativeDriver,
      animationDuration: duration,
    } = this.props;
    if (showOverlay !== nextProps.showOverlay) {
      const toValue = nextProps.showOverlay ? nextProps.opacity : 0;
      Animated.timing(this.state.opacity, {
        toValue,
        duration,
        useNativeDriver,
      }).start();
    }
  }

  props: OverlayType

  render() {
    const {
      onPress,
      pointerEvents,
      backgroundColor,
    } = this.props;

    const { opacity } = this.state;
    const dimensions = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[
          styles.overlay,
          { backgroundColor },
          { opacity },
          dimensions,
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          style={[styles.overlay, dimensions]}
        />
      </Animated.View>
    );
  }
}

export default Overlay;
