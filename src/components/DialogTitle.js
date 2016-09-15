import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DialogTitle({ title, titleStyle, titleTextStyle }) {
  return (
    <View style={[styles.title, titleStyle]}>
      <Text style={[styles.titleText, titleTextStyle]}>
        {title}
      </Text>
    </View>
	);
}

DialogTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  titleTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

const styles = StyleSheet.create({
  title: {
    padding: 14,
    backgroundColor: '#F9F9FB',
    alignItems: 'center',
    borderColor: '#DAD9DC',
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleText: {
    color: '#7F7D89',
    fontSize: 16,
  },
});

export default DialogTitle;
