// @flow

import React, { Children, cloneElement } from 'react';
import { View, StyleSheet } from 'react-native';
import type { DialogActionListProps } from '../type';

const styles = StyleSheet.create({
  buttonsBorder: {
    borderColor: '#CCD0D5',
    borderTopWidth: 0.2,
  },
  actionsVertical: {
    // flex: 1,
    height: 200,
    flexDirection: 'column',
  },
  actionsHorizontal: {
    flexDirection: 'row',
  },
});

function DialogActionList({
  style,
  children,
  bordered,
}: DialogActionListProps) {
  const buttonsStyle = children.length > 2
    ? styles.actionsVertical
    : styles.actionsHorizontal;

  const buttonsBorder = bordered
    ? styles.buttonsBorder
    : null;

  const content = children.length === 2
    ? Children.map(children, ((child, index) => cloneElement(child, {
      bordered: (1 % index === 0 && bordered),
    })))
    : children;

  return (
    <View style={[buttonsStyle, buttonsBorder, style]}>
      {content}
    </View>
  );
}

DialogActionList.defaultProps = {
  style: null,
  bordered: true,
};

export default DialogActionList;
