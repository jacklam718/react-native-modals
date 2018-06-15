// flow

import { Animated } from 'react-native';
import Animation from './Animation';

export default class FadeAnimation extends Animation {
  animate: Object
  animationDuration: number

  constructor({
    toValue = 0,
    animationDuration = 200,
    useNativeDriver = true,
  } = {}) {
    super({ toValue, useNativeDriver });
    this.animationDuration = animationDuration;
  }

  toValue(toValue: number, onFinished?: Function = () => {}) {
    Animated.timing(this.animate, {
      toValue,
      duration: this.animationDuration,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  createAnimations(): Object {
    return { opacity: this.animate };
  }
}
