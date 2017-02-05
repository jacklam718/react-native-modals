// flow

import { Animated } from 'react-native';
import Animation from './Animation';

export default class ScaleAnimation extends Animation {
  toValue(toValue: number, onFinished: ?Function) {
    switch (toValue) {
      case 0:
        Animated.spring(this.animate, {
          toValue,
          velocity: 3,
          tension: 250,
          friction: 20,
        }).start(onFinished);
        break;
      case 1:
        Animated.spring(this.animate, {
          toValue,
          velocity: 0,
          tension: 65,
          friction: 7,
        }).start(onFinished);
        break;
      default:
        break;
    }
  }

  createAnimations(): Object {
    const transform = [
      {
        scale: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      {
        scale: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ];

    const animations = {
      transform,
    };

    return animations;
  }
}
