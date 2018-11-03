[![Build Status](https://travis-ci.org/jacklam718/react-native-popup-dialog.svg?branch=master)](https://travis-ci.org/jacklam718/react-native-popup-dialog)
[![npm](https://img.shields.io/npm/dm/react-native-popup-dialog.svg)]()
[![npm](https://img.shields.io/npm/v/react-native-popup-dialog.svg)]()

## React Native Popup Dialog
React Native Popup Dialog for iOS & Android.

Another similar dialog component: [react-native-dialog-component](https://github.com/jacklam718/react-native-dialog-component) the main difference is style.

Pull request are welcomed. Please follow [Airbnb JS Style Guide](https://github.com/airbnb/javascript)

#### How to thank me ?
Just click on ⭐️ button 😘

[Try it with Exponent](https://exp.host/@jacklam718/popup-dialog-example)<br>
<img src="https://raw.githubusercontent.com/jacklam718/react-native-popup-dialog/master/.github/popup-dialog.png" width="200">
<br>
<br>
<!-- ![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog.gif) -->
<img src="https://jacklam718.github.io/react-native-popup-dialog/resources/popup-dialog-scale-animation.gif" width="250" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://jacklam718.github.io/react-native-popup-dialog/resources/popup-dialog-slide-animation.gif" width="250" />

<br>

<!-- ![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog-demo.png) -->
<img src="https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog-demo.png" width="250">

## BREAKING CHANGE
Has a lot of backward incompatible changes in `v0.16.0`. Please, Read the Docs before upgrading to `v0.16.0`

## Installation

```
npm install --save react-native-popup-dialog
# OR
yarn add react-native-popup-dialog
```

## Exposed Modules

* Dialog
* Overlay
* DialogButton
* DialogContent
* DialogTitle
* DialogActionList
* Animation
* FadeAnimation
* ScaleAnimation
* SlideAnimation
* DialogProps
* DialogActionListProps
* DialogButtonProps
* DialogTitleProps
* DialogContentProps
* OverlayProps

## Examples
[Example](https://github.com/jacklam718/react-native-popup-dialog/blob/master/popup-dialog-example/App.js)


## Basic Usage
```javascript
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button } from 'react-native'

<View style={styles.container}>
  <Button
    title="Show Dialog"
    onPress={() => {
      this.setState({ visible: true });
    }}
  />
  <Dialog
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
  >
    <DialogContent>
      {...}
    </DialogContent>
  </Dialog>
</View>
```

## Usage - Animation
```javascript
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

<View style={styles.container}>
  <Dialog
    visible={this.state.visible}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
  >
    <DialogContent>
      {...}
    </DialogContent>
  </Dialog>
</View>
```

## Usage - Dialog Dialog Title
```javascript
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';

<View style={styles.container}>
  <Dialog
    visible={this.state.visible}
    dialogTitle={<DialogTitle title="Dialog Title" />}
  >
    <DialogContent>
      {...}
    </DialogContent>
  </Dialog>
</View>
```

## Usage - Dialog Action
```javascript
import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';

<View style={styles.container}>
  <Dialog
    visible={this.state.visible}
    actions={[
      <DialogButton
        text="CANCEL"
        onPress={() => {}}
      />,
      <DialogButton
        text="OK"
        onPress={() => {}}
      />,
    ]}
  >
    <DialogContent>
      {...}
    </DialogContent>
  </Dialog>
</View>
```


## Props

### Dialog
| Prop | Type | Default | Note |
|---|---|---|---|
| `visible` | `boolean` | `false` | |
| `rounded` | `boolean` | `true` | |
| `useNativeDriver` | `boolean` | `true` | |
| `children` | `any` | | |
| `dialogTitle?` | `React Element` | | You can pass a `DialogTitle` component or pass a `View` for customizing titlebar |
| `width?` | `Number` | Your device width | The Width of Dialog, you can use fixed width or use percentage. For example `0.5` it means `50%`
| `height?` | `Number` | 300 | The Height of Dialog, you can use fixed height or use percentage. For example `0.5` it means `50%`
| `dialogAnimation?` |  | `FadeAnimation` | animation for dialog | |
| `dialogStyle?` | `any` | | | |
| `containerStyle?` | `any` | `null` | For example: ``` {  zIndex: 10, elevation: 10 } ``` | |
| `animationDuration?` | `Number` | `200` | | |
| `overlayPointerEvents?` | `String` | | Available option: `auto`, `none` |
| `overlayBackgroundColor?` | `String` | `#000` |
| `overlayOpacity?` | `Number` | `0.5` |
| `hasOverlay?` | `Boolean` | `true` | | |
| `onShow?` | `Function` | | You can pass shown function as a callback function, will call the function when dialog shown | |
| `onDismiss?` | `Function` | | You can pass onDismiss function as a callback function, will call the function when dialog dismissed | |
| `onTouchOutside?` | `Function` | `() => {}` | | |
| `onHardwareBackPress?` | `Function` | `() => true` | [Handle hardware button presses](https://facebook.github.io/react-native/docs/backhandler) | |
| `actionContainerStyle?` | `any` | `null` | | |
| `actions?` | `Array` | | Array of `DialogButton` component for example: ```[<DialogButton text="DISMISS" align="center" onPress={() => {}}/>]``` | |
| `actionsBordered?` | `Boolean` | `true` | | |


### DialogTitle
| Prop | Type | Default | Note |
|---|---|---|---|
| `title` | `String` | | | |
| `style?` | `any` | `null` | | |
| `textStyle?` | `any` | `null` | | |
| `align?` | `String` | `center` | Available option: `left`, `center`, `right` | |
| `hasTitleBar?` | `Bool` | `true` | | |


### DialogContent
| Prop | Type | Default | Note |
|---|---|---|---|
| `children` | `any` | | | |
| `style?` | `any` | `null` | | |


### DialogActionList
| Prop | Type | Default | Note |
|---|---|---|---|
| `children` | `any` | | | |
| `bordered?` | `Boolean` | `true` | | |
| `style?` | `any` | null | | |


### DialogButton
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


### Overlay
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
<img src="https://raw.githubusercontent.com/jacklam718/react-native-popup-dialog/master/.github/fade-animation.gif" width="200">

##### Example:
```javascript
new FadeAnimation({
  toValue: 0, // optional
  animationDuration: 150, // optional
  useNativeDriver: true, // optional
})
```
| Param | Type | Default | Note |
|---|---|---|---|
| `toValue` | Number | 0 | |
| `animationDuration?` | Number | 150 | |
| `useNativeDriver?` | Boolean | true | |

### ScaleAnimation
##### Preview:
<img src="https://raw.githubusercontent.com/jacklam718/react-native-popup-dialog/master/.github/scale-animation.gif" width="200">

##### Example:
```javascript
new ScaleAnimation({
  toValue: 0, // optional
  useNativeDriver: true, // optional
})
```
| Param | Type | Default | Note |
|---|---|---|---|
| `toValue` | Number | 0 | |
| `useNativeDriver` | Boolean | true |  |

### SlideAnimation
##### Preview:
<img src="https://raw.githubusercontent.com/jacklam718/react-native-popup-dialog/master/.github/slide-animation.gif" width="200">

##### Example:
```javascript
new SlideAnimation({
  toValue: 0, // optional
  slideFrom: 'bottom', // optional
  useNativeDriver: true, // optional
})
```
| Param | Type | Default | Note |
|---|---|---|---|
| `toValue` | Number | 0 | |
| `slideFrom` | String | `bottom` | Available option: `top`, `bottom`, `left`, `right` |
| `useNativeDriver` | Boolean | true | |


## Development
`yarn`

`yarn run build`
