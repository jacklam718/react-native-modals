## React Native Popup Dialog
React Native Popup Dialog for iOS & Android.

[Try it with Exponent](https://exp.host/@jacklam718/popup-dialog-example)
<!-- ![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog.gif) -->
![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/popup-dialog-scale-animation.gif)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/popup-dialog-slide-animation.gif)

## Installation

`npm install --save react-native-popup-dialog`

## Exposed Modules

1. Dialog
2. PopupDialog
3. ActionsDialog
4. DialogButton
5. DialogTitle
6. Overlay
7. Animation
8. ScaleAnimation
9. SlideAnimation


## Examples
[Example](https://github.com/jacklam718/react-native-popup-dialog/blob/master/popupDialogExample/PopupDialogExample.js)


## Usage
```javascript
import PopupDialog from 'react-native-popup-dialog';

<View style={styles.container}>
  <Button
    text="Open Dialog"
    onPress={() => {
      this.popupDialog.openDialog();
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
    text="Open Dialog"
    onPress={() => {
      this.popupDialog.openDialog();
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

## Props

### PopupDialog
| Prop | Type | Default | Note |
|---|---|---|---|
| `title` | `String` | | The popup title |
| `haveTitleBar` | `Bool` | `true` | If true show title bar else will hide hide title bar | |
| `titleAlign` | `String` | `center` | The position of the title items. Available option: `left`, `center`, `right` | |
| `width` | `Number` | Your device width | The Width of Dialog, you can use fixed width or use percentage
| `height` | `Number` | 300 | The Width of Dialog, you can use fixed height or use percentage
| `dialogAnimation` |  | `DefaultAnimation` | animation for dialog | |
| `animationDuration` | `Number` | `200` | | |
| `overlayPointerEvents` | `String` | | Available option: `auto`, `none` |
| `overlayBackgroundColor` | `String` | `#000` |
| `overlayOpacity` | `Number` | `0.5` |
| `closeOnTouchOutside` | `Bool` | `true` | When touch overlay will close dialog, but if `haveOverlay` is false then the `closeOnTouchOutside` won't work| |
| `haveOverlay` | `Bool` | `true` | If false won't show overlay while dialog open | |
| `open` | `Bool` | `false` |  | |
| `onOpened` | `Function` | | You can pass onOpend function as a aallback function, will call the function while dialog opened | |
| `onClosed` | `Function` | | You can pass onClosed function as a callback function, will call the function while dialog closed | |
| `actions` | `Array` | | Array of `DialogButton` component for example: ```[<DialogButton text="CLOSE", align="center" onPress={this.closeDialog}/>]``` | |


### DialogButton
| Prop | Type | Default | Note |
|---|---|---|---|
| `text` | `String` | | | |
| `align` | `String` | `center` | The position of the button. Available option: `left`, `center`, `right` | |
| `onPress` | `Function` | | | |
| `buttonStyle` | `Object` or `Number` | | | |
| `textStyle` | `Object` or `Number` | | | |
| `textContainerStyle` | `Object` or `Number` | | | |
| `disabled` | `Boolean` | `false` | | |
| `activeOpacity` | `Number` | | | |


## Animation
### Params for (*)Animation

### DefaultAnimation
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


## Welcome Become a Contributor 😃 👍
### I'm welcome anyone become a contributor.

### You must follow style guide.
  * [JavaScript](https://github.com/airbnb/javascript)
  * [React](https://github.com/airbnb/javascript/tree/master/react)
  * Use 2 spaces indentation

### Additional, I recommend you use linter.
  * [Configure Text Editors](https://github.com/kriasoft/react-starter-kit/blob/master/docs/how-to-configure-text-editors.md)
