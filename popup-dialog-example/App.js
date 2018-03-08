import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from './dist';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

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
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
});

export default class App extends Component {
  state = {
    dialogShow: false,
  };

  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }

  showSlideAnimationDialog = () => {
    this.slideAnimationDialog.show();
  }

  showFadeAnimationDialog = () => {
    this.fadeAnimationDialog.show();
  }

  renderScene = () => (
    <View style={styles.container}>
      <Button
        title="Show Dialog - Default Animation"
        onPress={this.showFadeAnimationDialog}
      />

      <Button
        title="Show Dialog - Scale Animation"
        onPress={this.showScaleAnimationDialog}
      />

      <Button
        title="Show Dialog - Slide Animation"
        onPress={this.showSlideAnimationDialog}
      />
    </View>
    )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Button
            title="Show Dialog - Default Animation"
            onPress={this.showFadeAnimationDialog}
          />

          <Button
            title="Show Dialog - Scale Animation"
            onPress={this.showScaleAnimationDialog}
          />

          <Button
            title="Show Dialog - Slide Animation"
            onPress={this.showSlideAnimationDialog}
          />
        </View>

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="Popup Dialog - Scale Animation" />}
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-1"
            />,
          ]}
        >
          <View style={styles.dialogContentView}>
            <Button
              title="Show Dialog - Default Animation"
              onPress={this.showFadeAnimationDialog}
            />
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

        <PopupDialog
          ref={(fadeAnimationDialog) => {
            this.fadeAnimationDialog = fadeAnimationDialog;
          }}
          dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
        >
          <View style={styles.dialogContentView}>
            <Text>Default Animation</Text>
          </View>
        </PopupDialog>
      </View>
    );
  }
}
