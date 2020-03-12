import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {blue_vivid} from '../../color';

const styles = StyleSheet.create({
  button: {
    padding: 12,
  },
  text: {
    fontSize: 17,
    color: blue_vivid,
  },
});

const Button = ({style = {}, textStyle = {}, onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
