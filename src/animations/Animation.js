// @flow

import { Animated } from 'react-native';

// Base Animation class
export default class Animation {
  useNativeDriver: boolean
  animate: Object
  animations: Object

  constructor({
    toValue = 0,
    useNativeDriver = true,
  }: {
    toValue?: number;
    useNativeDriver?: boolean;
  } = {}) {
    this.useNativeDriver = useNativeDriver;
    this.animate = new Animated.Value(toValue);
    this.animations = this.createAnimations();
  }

  toValue(): void {
    throw Error('not implemented yet');
  }

  createAnimations(): Object {
    throw Error('not implemented yet');
  }
}
