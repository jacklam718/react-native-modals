// @flow

import { Animated } from 'react-native';

// Base Animation class
export default class Animation {
  animate: Object
  animations: Object

  constructor(toValue: ?number = 0) {
    this.animate = new Animated.Value(toValue);
    this.animations = this.createAnimations();
  }

  toValue(toValue: number) {

  }

  createAnimations(): Object {
    return {};
  }
}
