import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

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
        <TouchableHighlight style={styles.button} onPress={this.openDialog}>
          <Text style={styles.buttonText}>Open Dialog</Text>
        </TouchableHighlight>
        <PopupDialog
          ref={(popupDialog) => {
            this.popupDialog = popupDialog;
          }}
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
  button: {
		// flexDirection:'column',
    width: WIDTH * 0.4,
    height: HEIGHT * 0.08,
    borderRadius: 50,
		// borderColor: 'black',
    borderWidth: 0,
    backgroundColor: '#009688',
    justifyContent: 'space-around',

  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '100',
  },
});
