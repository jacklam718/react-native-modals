// @flow

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
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

  componentDidUpdate(prevProps: BackdropProps) {
    const {
      visible,
      useNativeDriver,
      opacity,
      animationDuration: duration,
    } = this.props;
    if (prevProps.visible !== visible) {
      const toValue = visible ? opacity : 0;
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
    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={StyleSheet.flatten([StyleSheet.absoluteFill, {
          backgroundColor,
          opacity,
        }])}
      >
        <TouchableOpacity
          onPress={onPress}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    );
  }
}
