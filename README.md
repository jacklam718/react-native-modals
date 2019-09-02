[![Build Status](https://travis-ci.org/jacklam718/react-native-modals.svg?branch=master)](https://travis-ci.org/jacklam718/react-native-modals)
[![npm](https://img.shields.io/npm/dm/react-native-modals.svg)]()
[![npm](https://img.shields.io/npm/v/react-native-modals.svg)]()

## React Native Modals
React Native Modals Library for iOS & Android.

#### How to thank me ?
Just click on ⭐️ button 😘

[Try it with Exponent](https://exp.host/@jacklam718/modals-example)<br>

<br>
<br>
<!-- ![Example](https://jacklam718.github.io/react-native-modals/resources/react-native-modals.gif) -->
<span>
  <img src="https://raw.githubusercontent.com/jacklam718/react-native-modals/master/.github/swipeable-modal.gif" width="220">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/jacklam718/react-native-modals/master/.github/bottom-modal.gif" width="220">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/jacklam718/react-native-modals/master/.github/slide-animation.gif" width="220">
</span>

## BREAKING CHANGE
A lot of backward incompatible changes in `v0.19.3`. Please, Read the Docs before upgrading to `v0.19.3`

## Installation

```
npm install --save react-native-modals
# OR
yarn add react-native-modals
```

## Exposed Modules

* Modal
* BottomModal
* Backdrop
* ModalButton
* ModalContent
* ModalTitle
* ModalFooter
* Animation
* FadeAnimation
* ScaleAnimation
* SlideAnimation
* DragEvent,
* SwipeDirection,
* ModalProps
* ModalFooterProps
* ModalButtonProps
* ModalTitleProps
* ModalContentProps
* BackdropProps

## Examples
[Example](https://github.com/jacklam718/react-native-modals/blob/master/modals-example/App.js)


## Basic Usage
```jsx
import Modal, { ModalContent } from 'react-native-modals';
import { Button } from 'react-native'

<View style={styles.container}>
  <Button
    title="Show Modal"
    onPress={() => {
      this.setState({ visible: true });
    }}
  />
  <Modal
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
  >
    <ModalContent>
      {...}
    </ModalContent>
  </Modal>
</View>
```

## Usage - Animation
```jsx
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';

<View style={styles.container}>
  <Modal
    visible={this.state.visible}
    modalAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
  >
    <ModalContent>
      {...}
    </ModalContent>
  </Modal>
</View>
```

## Usage - Swipe
```jsx
import Modal, { ModalContent } from 'react-native-modals';
import { Button } from 'react-native'

<View style={styles.container}>
  <Modal
    visible={this.state.visible}
    swipeDirection={['up', 'down']} // can be string or an array
    swipeThreshold={200} // default 100
    onSwipeOut={(event) => {
      this.setState({ visible: false });
    }}
  >
    <ModalContent>
      {...}
    </ModalContent>
  </Modal>
</View>
```

## Usage - Modal Title
```jsx
import Modal, { ModalTitle, ModalContent } from 'react-native-modals';

<View style={styles.container}>
  <Modal
    visible={this.state.visible}
    modalTitle={<ModalTitle title="Modal Title" />}
  >
    <ModalContent>
      {...}
    </ModalContent>
  </Modal>
</View>
```

## Usage - Modal Action
```jsx
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

<View style={styles.container}>
  <Modal
    visible={this.state.visible}
    footer={
      <ModalFooter>
        <ModalButton
          text="CANCEL"
          onPress={() => {}}
        />
        <ModalButton
          text="OK"
          onPress={() => {}}
        />
      </ModalFooter>
    }
  >
    <ModalContent>
      {...}
    </ModalContent>
  </Modal>
</View>
```


## Props

### Modal
| Prop | Type | Default | Note |
|---|---|---|---|
| `visible` | `boolean` | `false` | |
| `rounded` | `boolean` | `true` | |
| `useNativeDriver` | `boolean` | `true` | |
| `children` | `any` | | |
| `modalTitle?` | `React Element` | | You can pass a `modalTitle` component or pass a `View` for customizing titlebar |
| `width?` | `Number` | Your device width | The Width of modal, you can use fixed width or use percentage. For example `0.5` it means `50%`
| `height?` | `Number` | 300 | The Height of modal, you can use fixed height or use percentage. For example `0.5` it means `50%`
| `modalAnimation?` |  | `FadeAnimation` | animation for modal | |
| `modalStyle?` | `any` | | | |
| `containerStyle?` | `any` | `null` | For example: ``` {  zIndex: 10, elevation: 10 } ``` | |
| `animationDuration?` | `Number` | `200` | | |
| `overlayPointerEvents?` | `String` | | Available option: `auto`, `none` |
| `overlayBackgroundColor?` | `String` | `#000` |
| `overlayOpacity?` | `Number` | `0.5` |
| `hasOverlay?` | `Boolean` | `true` | | |
| `onShow?` | `Function` | | You can pass shown function as a callback function, will call the function when modal shown | |
| `onDismiss?` | `Function` | | You can pass onDismiss function as a callback function, will call the function when modal dismissed | |
| `onTouchOutside?` | `Function` | `() => {}` | | |
| `onHardwareBackPress?` | `Function` | `() => true` | [Handle hardware button presses](https://facebook.github.io/react-native/docs/backhandler) | |
| `onMove?` | `Function` | `() => {}` | | |
| `onSwiping?` | `Function` | `() => {}` | | |
| `onSwipeRelease?` | `Function` | `() => {}` | | |
| `onSwipingOut?` | `Function` | `() => {}` | | |
| `onSwipeOut?` | `Function` | | | |
| `swipeDirection?` | `string or Array<string>` | [] | Available option: `up`, `down`, `left`, `right` | |
| `swipeThreshold?` | `number` | `100` | | |
| `footer?` | `React Element` | `null` | for example: ```<View><Button text="DISMISS" align="center" onPress={() => {}}/></View>``` | |

### ModalTitle
| Prop | Type | Default | Note |
|---|---|---|---|
| `title` | `String` | | | |
| `style?` | `any` | `null` | | |
| `textStyle?` | `any` | `null` | | |
| `align?` | `String` | `center` | Available option: `left`, `center`, `right` | |
| `hasTitleBar?` | `Bool` | `true` | | |


### ModalContent
| Prop | Type | Default | Note |
|---|---|---|---|
| `children` | `any` | | | |
| `style?` | `any` | `null` | | |


### ModalFooter
| Prop | Type | Default | Note |
|---|---|---|---|
| `children` | `ModalButton` | | | |
| `bordered?` | `Boolean` | `true` | | |
| `style?` | `any` | null | | |


### ModalButton
| Prop | Type | Default | Note |
|---|---|---|---|
| `text` | `String` | | | |
| `onPress` | `Function` | | | |
| `align?` | `String` | `center` | Available option: `left`, `center`, `right` | |
| `style?` | `any` | `null` | | |
| `textStyle?` | `any` | `null` | | |
| `activeOpacity?` | `Number` | `0.6` | | |
| `disabled?` | `Boolean` | `false` | | |
| `bordered?` | `Boolean` | `false` | | |


### Backdrop
| Prop | Type | Default | Note |
|---|---|---|---|
| `visible` | `Boolean` | | | |
| `opacity` | `Number` | `0.5` | | |
| `onPress?` | `Function` | | | |
| `backgroundColor?` | `string` | `#000` | | |
| `animationDuration?` | `Number` | `200` | | |
| `pointerEvents?` | `String` | `null` | Available option: `auto`, `none` | |
| `useNativeDriver?` | `Boolean` | `true` | | |


## Animation
### Params for (*)Animation

### FadeAnimation
##### Preview:
<img src="https://raw.githubusercontent.com/jacklam718/react-native-modals/master/.github/fade-animation.gif" width="200">

##### Example:
```javascript
new FadeAnimation({
  initialValue: 0, // optional
  animationDuration: 150, // optional
  useNativeDriver: true, // optional
})
```
| Param | Type | Default | Note |
|---|---|---|---|
| `initialValue` | Number | 0 | |
| `animationDuration?` | Number | 150 | |
| `useNativeDriver?` | Boolean | true | |

### ScaleAnimation
##### Preview:
<img src="https://raw.githubusercontent.com/jacklam718/react-native-modals/master/.github/scale-animation.gif" width="200">

##### Example:
```javascript
new ScaleAnimation({
  initialValue: 0, // optional
  useNativeDriver: true, // optional
})
```
| Param | Type | Default | Note |
|---|---|---|---|
| `initialValue` | Number | 0 | |
| `useNativeDriver` | Boolean | true |  |

### SlideAnimation
##### Preview:
<img src="https://raw.githubusercontent.com/jacklam718/react-native-modals/master/.github/slide-animation.gif" width="200">

##### Example:
```javascript
new SlideAnimation({
  initialValue: 0, // optional
  slideFrom: 'bottom', // optional
  useNativeDriver: true, // optional
})
```
| Param | Type | Default | Note |
|---|---|---|---|
| `initialValue` | Number | 0 | |
| `slideFrom` | String | `bottom` | Available option: `top`, `bottom`, `left`, `right` |
| `useNativeDriver` | Boolean | true | |

### Create your custom animation

##### Example:

```javascript
import { Animated } from 'react-native';
import { Animation } from 'react-native-modals';

class CustomAnimation extends Animation {
  in(onFinished) {
    Animated.spring(this.animate, {
      toValue: 1,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  out(onFinished) {
    Animated.spring(this.animate, {
      toValue: 0,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  getAnimations() {
    return {
      transform: [{
        translateY: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [800, 1],
        }),
      }],
    };
  }
}
```

## Development
`yarn`

`yarn run build`

`yarn test`
