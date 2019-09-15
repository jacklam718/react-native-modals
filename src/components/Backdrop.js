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

  constructor(props) {
    super(props)
    this.state = {
            backgroundColor: props.backgroundColor,
            animationDuration: props.animationDuration,
            visible: props.visible,
            useNativeDriver: props.useNativeDriver,
            opacity: new Animated.Value(0)
          }
      
      //    this.opacity.setValue(props.opacity)
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { visible, useNativeDriver, animationDuration: duration } = state;
    if (visible !== nextProps.visible) {
      const toValue = nextProps.visible ? nextProps.opacity : 0;
      Animated.timing(state.opacity, {
        toValue,
        duration,
        useNativeDriver,
      }).start();
    }
  }

  setOpacity = (value) => {
    this.state.opacity.setValue(value);
  }

  render() {
    const { onPress, pointerEvents } = this.props;
    const { opacity, backgroundColor } = this.state;
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
