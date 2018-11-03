import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    // flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  customBackgroundDialog: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
});

export default class App extends Component {
  state = {
    customBackgroundDialog: false,
    defaultAnimationDialog: false,
    scaleAnimationDialog: false,
    slideAnimationDialog: false,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Button
            title="Show Dialog - Default Animation"
            onPress={() => {
              this.setState({
                defaultAnimationDialog: true,
              });
            }}
          />

          <Button
            title="Show Dialog - Scale Animation"
            onPress={() => {
              this.setState({
                scaleAnimationDialog: true,
              });
            }}
          />

          <Button
            title="Show Dialog - Slide Animation"
            onPress={() => {
              this.setState({
                slideAnimationDialog: true,
              });
            }}
          />

          <Button
            title="Show Dialog - Custom Background Style"
            onPress={() => {
              this.setState({
                customBackgroundDialog: true,
              });
            }}
          />
        </View>

        <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          dialogTitle={
            <DialogTitle
              title="Popup Dialog - Default Animation"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          actions={[
            <DialogButton
              text="CANCEL"
              onPress={() => {
                this.setState({ defaultAnimationDialog: false });
              }}
              key="button-1"
            />,
            <DialogButton
              text="OK"
              onPress={() => {
                this.setState({ defaultAnimationDialog: false });
              }}
              key="button-2"
            />,
          ]}
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
            <Text>Default Animation</Text>
            <Text>No onTouchOutside handler. will not dismiss when touch overlay.</Text>
          </DialogContent>
        </Dialog>

        <Dialog
          onTouchOutside={() => {
            this.setState({ scaleAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.scaleAnimationDialog}
          dialogAnimation={new ScaleAnimation()}
          dialogTitle={
            <DialogTitle
              title="Popup Dialog - Scale Animation"
              hasTitleBar={false}
            />
          }
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                this.setState({ scaleAnimationDialog: false });
              }}
              key="button-1"
            />,
          ]}
        >
          <DialogContent>
            <Button
              title="Show Dialog - Default Animation"
              onPress={() => {
                this.setState({ defaultAnimationDialog: true });
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          onDismiss={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          visible={this.state.slideAnimationDialog}
          dialogTitle={<DialogTitle title="Popup Dialog - Slide Animation" />}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        >
          <DialogContent>
            <Text>Slide Animation</Text>
          </DialogContent>
        </Dialog>

        <Dialog
          onDismiss={() => {
            this.setState({ customBackgroundDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ customBackgroundDialog: false });
          }}
          zIndex={1000}
          backgroundStyle={styles.customBackgroundDialog}
          dialogStyle={{
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          dialogTitle={
            <DialogTitle
              title="Popup Dialog - Custom Background Style"
              hasTitleBar={false}
              textStyle={{ color: '#fff' }}
            />
          }
          visible={this.state.customBackgroundDialog}
        >
          <View style={styles.dialogContentView}>
            <Text style={{ color: '#fff' }}>Custom backgroundStyle</Text>
          </View>
        </Dialog>
      </View>
    );
  }
}
