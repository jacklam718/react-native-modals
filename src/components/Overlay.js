// @flow

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import type { OverlayType } from '../type';

// default overlay options
const BACKGROUND_COLOR: string = '#000';
const OPACITY: number = 0.5;
const ANIMATION_DURATION: number = 2000;
const SHOW_OVERLAY: boolean = false;


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
;

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor, opacity },
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    );
  }
}

export default Overlay;
