## React Native Popup Dialog
React Native Popup Dialog for iOS & Android.

![Example](https://jacklam718.github.io/react-native-popup-dialog/resources/react-native-popup-dialog.gif)

## Installation
npm install --save react-native-popup-dialog

## Exposed Modules

1. PopupDialog
2. Dialog
3. Overlay
4. Animation
5. ScaleAnimation

## Examples
[Example](https://github.com/jacklam718/react-native-popup-dialog/blob/master/popupDialogExample/PopupDialogExample.js)


## Usage
```javascript
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


## Props

### PopupDialog
| Attribute | Type | Default | Note |
|---|---|---|---|
| `title` | `String` | The popup title
| `width` | `Number` | Your device width | The Width of Dialog, you can use fixed width or use percentage
| `height` | `Number` | 300 | The Width of Dialog, you can use fixed height or use percentage
| `dialogAnimation` |  | `ScaleAnimation` | animation for dialog | |
| `animationDuration` | `Number` | `200` | | |
| `overlayBackgroundColor` | `String` | `#000` |
| `overlayOpacity` | `Number` | `0.5` |
| `closeOnTouchOutside` | `Bool` | `true` | When touch overlay will close dialog | |
| `open` | `Bool` | `false` |  | |
| `onOpened` | `Function` | | You can pass onOpend function as a aallback function, will call the function while dialog opened | |
| `onClosed` | `Function` | | You can pass onClosed function as a callback function, will call the function while dialog closed | |
