import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {gray, silver, red} from '../../color';

const styles = StyleSheet.create({
  fieldContainer: {
    position: 'relative',
    paddingBottom: 23,
  },
  textInput: {
    backgroundColor: silver,
    padding: 5,
    height: 36,
    fontSize: 18,
    borderColor: gray,
    borderWidth: 1,
  },
  errorInput: {borderColor: red},
  tooltip: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    color: red,
    fontSize: 15,
    lineHeight: 15,
  },
});

const FormInput = ({input, meta, placeholder}) => {
  const isError = meta.error && meta.touched;
  return (
    <View style={styles.fieldContainer}>
      {/* TODO: KEYBORD MUST NOT OVERFLOW INPUT */}
      <TextInput
        {...input}
        placeholder={placeholder}
        style={[styles.textInput, isError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholderTextColor={gray}
      />
      {isError && <Text style={styles.tooltip}>{meta.error}</Text>}
    </View>
  );
};

export default FormInput;
