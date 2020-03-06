import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {blue_vivid} from '../../color';

const styles = StyleSheet.create({
  button: {
    //display: 'flex',
    //height: 50,
    //borderRadius: 5,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 12,

    //backgroundColor: 'yellow',
    //shadowColor: '#2AC062',
    //shadowOpacity: 0.4,
    //shadowOffset: {height: 10, width: 0},
    //shadowRadius: 20,
  },
  text: {
    fontSize: 17,
    //fontWeight: '700',
    //textTransform: 'uppercase',
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
