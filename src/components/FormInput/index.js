import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {gray, silver, red} from '../../color';

const LINE_H = 21;

const styles = StyleSheet.create({
  fieldContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: silver,
    padding: 5,
    height: 35,
    lineHeight: LINE_H,
    fontSize: 18,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 3,
  },
  defaultMultipletextInput: {
    height: 'auto',
    minHeight: 54,
  },
  errorInput: {borderColor: red},
  tooltip: {
    position: 'absolute',
    bottom: -15,
    right: 0,
    color: red,
    fontSize: 14,
    lineHeight: 14,
  },
});

const FormInput = ({
  input,
  meta,
  submitError = '',
  multiline = false,
  numberOfLines,
  label,
  style = {},
  inputStyle = {},
  tooltipStyle = {},
  // in restProps may be used:
  // placeholder, onSubmitEditing, returnKeyType, autoCapitalize, autoFocus
  ...restProps
}) => {
  const isError = (meta.error && meta.touched) || Boolean(submitError);
  return (
    <View style={[styles.fieldContainer, style]}>
      {/* TODO: KEYBORD MUST NOT OVERFLOW INPUT */}
      {label && <Text>{label}</Text>}
      <TextInput
        {...input}
        {...restProps}
        multiline={multiline}
        numberOfLines={numberOfLines}
        underlineColorAndroid="transparent"
        placeholderTextColor={gray}
        style={[
          styles.textInput,
          multiline &&
            (numberOfLines
              ? {height: LINE_H * 1.2 * numberOfLines}
              : styles.defaultMultipletextInput),
          inputStyle,
          isError && styles.errorInput,
        ]}
      />
      {isError && (
        <Text style={[styles.tooltip, tooltipStyle]}>
          {meta.error || submitError}
        </Text>
      )}
    </View>
  );
};

export default FormInput;
