// flow

import { Animated } from 'react-native';
import Animation from './Animation';

export default class ScaleAnimation extends Animation {
  toValue(toValue: number, onFinished) {
    switch (toValue) {
      case 0:
        Animated.spring(this.animate, {
          toValue,   // Returns to the start
          velocity: 3,  // Velocity makes it move
          tension: 250, // Slow
          friction: 20,  // Oscillate a lot
        }).start(onFinished);
        // Animated.spring(this.animate, {
        //   toValue,   // Returns to the start
        //   velocity: 0,  // Velocity makes it move
        //   tension: 20, // Slow
        //   friction: 7,  // Oscillate a lot
        // }).start(cb);
        // Animated.spring(this.animate, {
        //   toValue,   // Returns to the start
        //   tension: 50,
        // }).start(cb);
        break;
      case 1:
        Animated.spring(this.animate, {
          toValue,   // Returns to the start
          velocity: 0,  // Velocity makes it move
          tension: 65, // Slow
          friction: 7,  // Oscillate a lot
        }).start(onFinished);
        // Animated.spring(this.animate, {
        //   toValue,   // Returns to the start
        //   tension: 100,
        // }).start(cb);
        // Animated.spring(this.animate, {
        //   toValue,   // Returns to the start
        //   velocity: 0,  // Velocity makes it move
        //   tension: 100, // Slow
        //   friction: 8.5,  // Oscillate a lot
        // }).start(onFinished);
        break;
      default:
        break;
    }
  }

  createAnimations() {
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
