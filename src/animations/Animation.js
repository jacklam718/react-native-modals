// @flow

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["in", "out", "getAnimations"] }] */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "onFinished" }] */

import { Animated } from 'react-native';

export type AnimationConfig = {
  initialValue?: number;
  useNativeDriver?: boolean;
};

// Base Animation class
export default class Animation {
  useNativeDriver: boolean
  animate: Animated.Value

  constructor({
    initialValue = 0,
    useNativeDriver = true,
  }: AnimationConfig = {}) {
    this.animate = new Animated.Value(initialValue);
    this.useNativeDriver = useNativeDriver;
  }

  in(onFinished?: Function): void {
    throw Error('not implemented yet');
  }

  out(onFinished?: Function): void {
    throw Error('not implemented yet');
  }

  getAnimations(): Object {
    throw Error('not implemented yet');
  }
}
