import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 5,
    marginHorizontal: 5,
  },
  iconStyle: {
    resizeMode: 'contain',
  },
});

const ButtonIcon = ({src, style = {}, iconStyle = {}, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Image source={src} style={[styles.iconStyle, iconStyle]} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
