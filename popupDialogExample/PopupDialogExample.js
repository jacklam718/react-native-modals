import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PopupDialog, { DialogButton, SlideAnimation, DefaultAnimation } from 'react-native-popup-dialog';
import Button from './Button';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
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
          dialogAnimation={defaultAnimation}
          title="Popup Dialog - Default Animation"
        >
          <View style={styles.dialogContentView}>
            <Text>Default Animation</Text>
          </View>
        </PopupDialog>

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          title="Popup Dialog - Scale Animation"
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
          ref={(popupDialog) => {
            this.slideAnimationDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
          title="Popup Dialog - Slide Animation"
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
