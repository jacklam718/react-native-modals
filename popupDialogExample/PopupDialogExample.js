import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  DefaultAnimation,
} from 'react-native-popup-dialog';
import Button from './Button';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const defaultAnimation = new DefaultAnimation({ animationDuration: 150 });

export default class PopupDialogExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };

    this.openScaleAnimationDialog = this.openScaleAnimationDialog.bind(this);
    this.openSlideAnimationDialog = this.openSlideAnimationDialog.bind(this);
    this.openDefaultAnimationDialog = this.openDefaultAnimationDialog.bind(this);
  }

  openScaleAnimationDialog() {
    this.scaleAnimationDialog.openDialog();
  }

  openSlideAnimationDialog() {
    this.slideAnimationDialog.openDialog();
  }

  openDefaultAnimationDialog() {
    this.defaultAnimationDialog.openDialog();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          text="Open Dialog - Default Animation"
          onPress={this.openDefaultAnimationDialog}
        />

        <Button
          text="Open Dialog - Scale Animation"
          onPress={this.openScaleAnimationDialog}
        />

        <Button
          text="Open Dialog - Slide Animation"
          onPress={this.openSlideAnimationDialog}
        />

        <PopupDialog
          ref={(defaultAnimationDialog) => {
            this.defaultAnimationDialog = defaultAnimationDialog;
          }}
          dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
          dialogAnimation={defaultAnimation}
        >
          <View style={styles.dialogContentView}>
            <Text>Default Animation</Text>
          </View>
        </PopupDialog>

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="Popup Dialog - Scale Animation" />}
          actions={[
            <DialogButton
              text="CLOSE"
              onPress={() => {
                this.scaleAnimationDialog.closeDialog();
              }}
              key="button-1"
            />,
          ]}
        >
          <View style={styles.dialogContentView}>
            <Text>Scale Animation</Text>
          </View>
        </PopupDialog>

        <PopupDialog
          dialogTitle={<DialogTitle title="Popup Dialog - Slide Animation" />}
          ref={(popupDialog) => {
            this.slideAnimationDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.dialogContentView}>
            <Text>Slide Animation</Text>
          </View>
        </PopupDialog>
      </View>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
