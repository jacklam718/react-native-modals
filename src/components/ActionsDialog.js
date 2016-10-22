// @flow

import React, { PropTypes, Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Dialog from './Dialog';

class ActionsDialog extends Component {
  static propTypes = {
    ...Dialog.propTypes,
    actions: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(onOpened) {
    this.dialog.open(onOpened);
  }

  close(onClosed) {
    this.dialog.close(onClosed);
  }

  render() {
    return (
      <Dialog
        ref={dialog => { this.dialog = dialog; }}
        {...this.props}
      >
        <View style={styles.container}>
          {this.props.children}
          {this.props.actions}
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ActionsDialog;
