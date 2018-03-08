[![Build Status](https://travis-ci.org/jacklam718/react-native-popup-dialog.svg?branch=master)](https://travis-ci.org/jacklam718/react-native-popup-dialog)
[![npm](https://img.shields.io/npm/dm/react-native-popup-dialog.svg)]()
[![npm](https://img.shields.io/npm/v/react-native-popup-dialog.svg)]()

## React Native Popup Dialog
React Native Popup Dialog for iOS & Android.

Another similar dialog component: [react-native-dialog-component](https://github.com/jacklam718/react-native-dialog-component) the main difference is style.

Pull request are welcomed. Please follow [Airbnb JS Style Guide](https://github.com/airbnb/javascript)

[Try it with Exponent](https://exp.host/@jacklam718/popup-dialog-example)<br>
<img src="https://raw.githubusercontent.com/jacklam718/react-native-popup-dialog/master/.github/popup-dialog.png" width="200">
<br>
<br>
<!-- ![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog.gif) -->
<img src="https://jacklam718.github.io/react-native-popup-dialog/resources/popup-dialog-scale-animation.gif" width="250" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://jacklam718.github.io/react-native-popup-dialog/resources/popup-dialog-slide-animation.gif" width="250" />

<br>

<!-- ![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog-demo.png) -->
<img src="https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog-demo.png" width="250">

## Installation

```
npm install --save react-native-popup-dialog
# OR
yarn add react-native-popup-dialog
```

## Exposed Modules

* Dialog
* PopupDialog
* DialogButton
* DialogTitle
* Overlay
* Animation
* FadeAnimation
* ScaleAnimation
* SlideAnimation
* PopupDialogType
* DialogType
* DialogButtonType
* DialogTitleType
* OverlayType

## Examples
[Example](https://github.com/jacklam718/react-native-popup-dialog/blob/master/popup-dialog-example/PopupDialogExample.js)


## Usage
```javascript
import PopupDialog from 'react-native-popup-dialog';
import { Button } from 'react-native'

<View style={styles.container}>
  <Button
    title="Show Dialog"
    onPress={() => {
      this.popupDialog.show();
    }}
  />
  <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <View>
      <Text>Hello</Text>
    </View>
  </PopupDialog>
</View>
```

## Usage - With Animation
```javascript
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

<View style={styles.container}>
  <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    dialogAnimation={slideAnimation}
  >
    <View>
      <Text>Hello</Text>
    </View>
  </PopupDialog>
</View>
```

## Usage - With Dialog Dialog Title
```javascript
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

<View style={styles.container}>
  <PopupDialog
    dialogTitle={<DialogTitle title="Dialog Title" />}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <View>
      <Text>Hello</Text>
    </View>
  </PopupDialog>
</View>
```

## Methods
#### show
```javascript
this.popupDialog.show(() => {
  console.log('callback - will be called immediately')
});
```

#### dismiss
```javascript
this.popupDialog.dismiss(() => {
  console.log('callback - will be called immediately')
});
```

## Props

### PopupDialog
| Prop | Type | Default | Note |
|---|---|---|---|
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
| `dismissOnTouchOutside?` | `Bool` | `true` | When touch overlay will dismiss dialog, but if `haveOverlay?` is false then the `dismissOnTouchOutside` won't work| |
| `dismissOnHardwareBackPress?` | `Bool` | `true` | Only for Android | |
| `haveOverlay?` | `Bool` | `true` | If false won't show overlay while dialog show | |
| `show?` | `Bool` | `false` |  | |
| `onShown?` | `Function` | | You can pass shown function as a callback function, will call the function when dialog shown | |
| `onDismissed?` | `Function` | | You can pass onDismissed function as a callback function, will call the function when dialog dismissed | |
| `actions?` | `Array` | | Array of `DialogButton` component for example: ```[<DialogButton text="DISMISS" align="center" onPress={() => this.popupDialog.dismiss()}/>]``` | |


### DialogTitle
| Prop | Type | Default | Note |
|---|---|---|---|
| `title` | `String` | | | |
| `titleStyle?` | `any` | | | |
| `titleTextStyle?` | `any` | | | |
| `titleAlign?` | `String` | `center` | Available option: `left`, `center`, `right` | |
| `haveTitleBar?` | `Bool` | `true` | | |


### DialogButton
| Prop | Type | Default | Note |
|---|---|---|---|
| `text` | `String` | | | |
| `align?` | `String` | `center` | The position of the button. Available option: `left`, `center`, `right` | |
| `onPress?` | `Function` | | | |
| `buttonStyle?` | `any` | | | |
| `textStyle?` | `any` | | | |
| `textContainerStyle?` | `any` | | | |
| `disabled?` | `Boolean` | `false` | | |
| `activeOpacity?` | `Number` | | | |


## Animation
### Params for (*)Animation

### FadeAnimation
| Param | Type | Default | Note |
|---|---|---|---|
| `toValue` | Number | 0 | |
| `animationDuration` | Number | 150 | |

### ScaleAnimation
| Param | Type | Default | Note |
|---|---|---|---|
| `toValue` | Number | 0 | |

### SlideAnimation
| Param | Type | Default | Note |
|---|---|---|---|
| `toValue` | Number | 0 | |
| `slideFrom` | String | `bottom` | Available option: `top`, `bottom`, `left`, `right` |

## Development
`yarn`

`yarn run build`
