## React Native Popup Dialog
React Native Popup Dialog for iOS & Android.

Pull request are welcomed. Please follow [Airbnb JS Style Guide](https://github.com/airbnb/javascript)

[Try it with Exponent](https://exp.host/@jacklam718/popup-dialog-example)
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

1. Dialog
2. PopupDialog
3. DialogButton
4. DialogTitle
5. Overlay
6. Animation
7. DefaultAnimation
8. ScaleAnimation
9. SlideAnimation
10. PopupDialogType
11. DialogType
12. DialogButtonType
13. DialogTitleType
14. OverlayType

## Examples
[Example](https://github.com/jacklam718/react-native-popup-dialog/blob/master/popupDialogExample/PopupDialogExample.js)


## Usage
```javascript
import PopupDialog from 'react-native-popup-dialog';

<View style={styles.container}>
  <Button
    text="Show Dialog"
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

<View style={styles.container}>
  <Button
    text="Show Dialog"
    onPress={() => {
      this.popupDialog.show();
    }}
  />
  <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
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
  <Button
    text="Show Dialog"
    onPress={() => {
      this.popupDialog.show();
    }}
  />
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

## Props

### PopupDialog
| Prop          | Type            | Default | Note                                     |
| ------------- | --------------- | ------- | ---------------------------------------- |
| `dialogTitle` | `React Element` |         | You can pass a `DialogTitle` component or pass a `View` for customizing titlebar |
| `width` | `Number` | Your device width | The Width of Dialog, you can use fixed width or use percentage
| `height` | `Number` | 300 | The Width of Dialog, you can use fixed height or use percentage
| `dialogAnimation` |  | `DefaultAnimation` | animation for dialog | |
| `dialogStyle` | `Object` or `Number` | | | |
| `animationDuration` | `Number` | `200` | | |
| `overlayPointerEvents` | `String` | | Available option: `auto`, `none` |
| `overlayBackgroundColor` | `String` | `#000` |
| `overlayOpacity` | `Number` | `0.5` |
| `dismissOnTouchOutside` | `Bool` | `true` | When touch overlay will dismiss dialog, but if `haveOverlay` is false then the `dismissOnTouchOutside` won't work| |
| `dismissOnHardwareBackPress` | `Bool` | `true` | Only for Android | |
| `haveOverlay` | `Bool` | `true` | If false won't show overlay while dialog show | |
| `show` | `Bool` | `false` |  | |
| `onShowed` | `Function` | | You can pass showed function as a aallback function, will call the function when dialog showed | |
| `onDismissed` | `Function` | | You can pass onDismissed function as a callback function, will call the function when dialog dismissed | |
| `borderRadius` | `Number` | 8    | The value of borderRadius of the popup dialog content view. | |




### DialogTitle
| Prop             | Type                 | Default  | Note |
| ---------------- | -------------------- | -------- | ---- |
| `title`          | `String`             |          |      |
| `titleStyle`     | `Object` or `Number` |          |      |
| `titleTextStyle` | `Object` or `Number` |          |      |
| `titleAlign`     | `String`             | `center` |      |
| `haveTitleBar`   | `Bool`               | `true`   |      |


### DialogButton
| Prop                 | Type                 | Default  | Note                                     |
| -------------------- | -------------------- | -------- | ---------------------------------------- |
| `text`               | `String`             |          |                                          |
| `align`              | `String`             | `center` | The position of the button. Available option: `left`, `center`, `right` |
| `onPress`            | `Function`           |          |                                          |
| `buttonStyle`        | `Object` or `Number` |          |                                          |
| `textStyle`          | `Object` or `Number` |          |                                          |
| `textContainerStyle` | `Object` or `Number` |          |                                          |
| `disabled`           | `Boolean`            | `false`  |                                          |
| `activeOpacity`      | `Number`             |          |                                          |


## Animation
### Params for (*)Animation

### DefaultAnimation
| Param               | Type   | Default | Note |
| ------------------- | ------ | ------- | ---- |
| `toValue`           | Number | 0       |      |
| `animationDuration` | Number | 150     |      |

### ScaleAnimation
| Param     | Type   | Default | Note |
| --------- | ------ | ------- | ---- |
| `toValue` | Number | 0       |      |

### SlideAnimation
| Param       | Type   | Default  | Note                                     |
| ----------- | ------ | -------- | ---------------------------------------- |
| `toValue`   | Number | 0        |                                          |
| `slideFrom` | String | `bottom` | Available option: `top`, `bottom`, `left`, `right` |
