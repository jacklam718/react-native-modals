// flow

import { Animated, Dimensions } from 'react-native';
import Animation from './Animation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class SlideAnimation extends Animation {
  constructor({
    initialValue = 0,
    useNativeDriver = true,
    slideFrom = 'bottom',
  } = {}) {
    super({ initialValue, useNativeDriver });
    this.slideFrom = slideFrom;
  }

  in(onFinished?: Function = () => {}): void {
    Animated.spring(this.animate, {
      toValue: 1,
      velocity: 0,
      tension: 65,
      friction: 10,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  out(onFinished?: Function = () => {}): void {
    Animated.spring(this.animate, {
      toValue: 0,
      velocity: 0,
      tension: 65,
      friction: 10,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  getAnimations(): Object {
    const transform = [];
    if (this.slideFrom === 'top') {
      transform.push({
        translateY: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [-SCREEN_HEIGHT, 1],
        }),
      });
    }
    if (this.slideFrom === 'bottom') {
      transform.push({
        translateY: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_HEIGHT, 1],
        }),
      });
    }
    if (this.slideFrom === 'left') {
      transform.push({
        translateX: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [-SCREEN_WIDTH, 1],
        }),
      });
    }
    if (this.slideFrom === 'right') {
      transform.push({
        translateX: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_WIDTH, 1],
        }),
      });
    }
    return {
      transform,
    };
  }
}
