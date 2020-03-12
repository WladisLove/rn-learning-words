import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Form, Field} from 'react-final-form';
import FormInput from '../../FormInput';

import {generateWordID} from '../../../helpers';
import {red} from '../../../color';

const styles = StyleSheet.create({
  errorTip: {color: red, fontSize: 16},
});

export const mainFields = ['word', 'meaning'];
export const secondaryFields = ['synonyms', 'context'];
const fieldsConfig = {
  word: {
    placeholder: 'Word',
    inputProps: {
      label: 'Word:',
    },
  },
  meaning: {
    placeholder: 'Meaning',
    inputProps: {
      label: 'Meaning:',
    },
  },
  synonyms: {
    placeholder: 'Synonyms',
    inputProps: {
      label: 'Synonyms:',
      multiline: true,
    },
  },
  context: {
    placeholder: 'Context',
    inputProps: {
      label: 'Context:',
      multiline: true,
    },
  },
};

export let submitExternal = () => {};

const WordForm = ({word, onSave, isLandscape}) => {
  const witWord = Boolean(word);

  const onValidate = values => ({
    word: !values.word ? 'Required' : undefined,
    meaning: !values.meaning ? 'Required' : undefined,
  });

  const onSubmit = values =>
    onSave({...values, id: witWord ? word.id : generateWordID(values.word)});

  return (
    <Form
      onSubmit={onSubmit}
      validate={onValidate}
      render={({handleSubmit, submitError}) => {
        submitExternal = handleSubmit;
        return (
          <>
            {mainFields.map(name => {
              let conf = fieldsConfig[name];
              return (
                <Field
                  key={name}
                  name={name}
                  placeholder={conf.placeholder}
                  initialValue={witWord ? word[name] : undefined}>
                  {fieldProps => (
                    <FormInput {...fieldProps} {...conf.inputProps} />
                  )}
                </Field>
              );
            })}
            {secondaryFields.map(name => {
              let conf = fieldsConfig[name];
              return (
                <Field
                  key={name}
                  name={name}
                  placeholder={conf.placeholder}
                  initialValue={witWord ? word[name] : undefined}>
                  {fieldProps => (
                    <FormInput {...fieldProps} {...conf.inputProps} />
                  )}
                </Field>
              );
            })}
            {submitError && <Text style={styles.errorTip}>{submitError}</Text>}
          </>
        );
      }}
    />
  );
};

export default WordForm;
