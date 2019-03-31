// @flow

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["in", "out", "getAnimations"] }] */

import { Animated } from 'react-native';

// Base Animation class
export default class Animation {
  useNativeDriver: boolean
  animate: Animated.Value

  constructor({
    initialValue = 0,
    useNativeDriver = true,
  }: {
    initialValue?: number;
    useNativeDriver?: boolean;
  } = {}) {
    this.animate = new Animated.Value(initialValue);
    this.useNativeDriver = useNativeDriver;
  }

  in(): void {
    throw Error('not implemented yet');
  }

  out(): void {
    throw Error('not implemented yet');
  }

  getAnimations(): Object {
    throw Error('not implemented yet');
  }
}
