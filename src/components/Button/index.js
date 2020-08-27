import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {blue_vivid} from '../../color';

const styles = StyleSheet.create({
  button: {padding: 12, flexDirection: 'row', alignItems: 'center'},
  text: {
    fontSize: 17,
    color: blue_vivid,
  },
  icon: {
    resizeMode: 'contain',
    maxWidth: 20,
    height: 20,
  },
});

const Button = ({style, textStyle, onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {props.icon && (
        <Image source={props.icon} style={[styles.icon, props.iconStyle]} />
      )}
      <Text style={[styles.text, textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
