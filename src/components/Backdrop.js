// @flow

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import type { BackdropProps } from '../type';

export default class Backdrop extends Component<BackdropProps> {
  static defaultProps = {
    backgroundColor: '#000',
    opacity: 0.5,
    animationDuration: 2000,
    visible: false,
    useNativeDriver: true,
    onPress: () => {},
  };

  componentWillReceiveProps(nextProps: BackdropProps) {
    const { visible, useNativeDriver, animationDuration: duration } = this.props;
    if (visible !== nextProps.visible) {
      const toValue = nextProps.visible ? nextProps.opacity : 0;
      Animated.timing(this.opacity, {
        toValue,
        duration,
        useNativeDriver,
      }).start();
    }
  }

  setOpacity = (value) => {
    this.opacity.setValue(value);
  }

  opacity = new Animated.Value(0)

  render() {
    const { onPress, pointerEvents, backgroundColor } = this.props;
    const { opacity } = this;
    const { width, height } = Dimensions.get('window');
    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={{
          width: width * 3,
          height: height * 3,
          position: 'absolute',
          backgroundColor,
          opacity,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    );
  }
}
