import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class CustomButton extends React.Component {
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <View style={styles.rect}>
          <View style={styles.triangle} />
          <Text style={styles.textStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  rect: {
    height: 40,
    width: 120,
    backgroundColor: '#2596be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
  },
  textStyle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
