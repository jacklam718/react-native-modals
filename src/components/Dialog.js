// flow

import React, { PropTypes, Element, cloneElement, Children } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';

const SCRREN_WIDTH = Dimensions.get('window').width;
const SCRREN_HEIGHT = Dimensions.get('window').height;

function getDialogSize({ width, height }): Object {
  const size = { width, height };
  if (width > 0.0 && width < 1.0) {
    size.width = width * SCRREN_WIDTH;
  }
  if (height > 0.0 && height < 1.0) {
    size.height = height * SCRREN_HEIGHT;
  }
  return size;
}

function Dialog({ animations, width, height, children }): Element {
  const size = getDialogSize({ width, height });
  let backgroundColor;

  if (children) {
    if (children.props.style) {
      backgroundColor = { backgroundColor: children.props.style.backgroundColor };
    }
  }

  return (
    <Animated.View style={[styles.dialog, size, animations, backgroundColor]} >
      {children}
    </Animated.View>
  );
}

Dialog.propTypes = {
  animations: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.any,
};

Dialog.defaultProps = {
  width: SCRREN_WIDTH,
  height: 300,
};

const styles = StyleSheet.create({
  dialog: {
    width: 300,
    height: 300,
    borderRadius: 8,
    padding: 5,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default Dialog;
