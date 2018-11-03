// @flow

import React, { Children, cloneElement } from 'react';
import { View, StyleSheet } from 'react-native';
import type { DialogActionListProps } from '../type';

const styles = StyleSheet.create({
  border: {
    borderColor: '#CCD0D5',
    borderTopWidth: 0.2,
  },
  actionsVertical: {
    height: 200,
    flexDirection: 'column',
  },
  actionsHorizontal: {
    flexDirection: 'row',
  },
});

function DialogActionList({
  style,
  bordered,
  children,
}: DialogActionListProps) {
  const containerStyle = children.length > 2
    ? styles.actionsVertical
    : styles.actionsHorizontal;

  const border = bordered
    ? styles.border
    : null;

  // apply horizontal border if actions legnth is 2 & bordered is true
  const content = children.length === 2
    ? Children.map(children, ((child, index) => cloneElement(child, {
      bordered: (1 % index === 0 && bordered),
    })))
    : children;

  return (
    <View style={[containerStyle, border, style]}>
      {content}
    </View>
  );
}

DialogActionList.defaultProps = {
  style: null,
  bordered: true,
};

export default DialogActionList;
