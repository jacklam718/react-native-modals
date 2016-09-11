import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoundButton } from 'react-native-button-component';
// import PopupDialog from 'react-native-popup-dialog';
import PopupDialog from './src/PopupDialog';

export default class PopupDialogExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };

    this.openDialog = this.openDialog.bind(this);
  }

  openDialog() {
    this.popupDialog.openDialog();
  }

  render() {
    return (
      <View style={styles.container}>
        <RoundButton
          text="Open Dialog"
          onPress={this.openDialog}
        />
        <PopupDialog
          ref={(popupDialog => { this.popupDialog = popupDialog; })}
          title="Popup Dialog"
        >
          <View>
            <Text>Hello</Text>
          </View>
        </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000',
  },
});
