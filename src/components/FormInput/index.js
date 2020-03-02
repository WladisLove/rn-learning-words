import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {gray, silver, red} from '../../color';

const LINE_H = 21;

const styles = StyleSheet.create({
  fieldContainer: {
    position: 'relative',
    paddingBottom: 23,
  },
  textInput: {
    backgroundColor: silver,
    padding: 5,
    height: 35,
    lineHeight: LINE_H,
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

const FormInput = ({
  input,
  meta,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  label,
}) => {
  const isError = meta.error && meta.touched;
  return (
    <View style={styles.fieldContainer}>
      {/* TODO: KEYBORD MUST NOT OVERFLOW INPUT */}
      {label && <Text>{label}</Text>}
      <TextInput
        {...input}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        placeholderTextColor={gray}
        style={[
          styles.textInput,
          multiline && {height: LINE_H * 1.2 * numberOfLines},
          isError && styles.errorInput,
        ]}
      />
      {isError && <Text style={styles.tooltip}>{meta.error}</Text>}
    </View>
  );
};

export default FormInput;
