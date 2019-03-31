// flow

import { Animated } from 'react-native';
import Animation from './Animation';

export default class FadeAnimation extends Animation {
  animate: Animated.Value
  animationDuration: number

  constructor({
    initialValue = 0,
    animationDuration = 200,
    useNativeDriver = true,
  } = {}) {
    super({ initialValue, useNativeDriver });
    this.animationDuration = animationDuration;
  }

  in(onFinished?: Function = () => {}): void {
    Animated.timing(this.animate, {
      toValue: 1,
      duration: this.animationDuration,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  out(onFinished?: Function = () => {}): void {
    Animated.timing(this.animate, {
      toValue: 0,
      duration: this.animationDuration,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  getAnimations(): Object {
    return { opacity: this.animate };
  }
}
