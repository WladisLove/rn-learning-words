import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Form, Field} from 'react-final-form';
import FormInput from '../../FormInput';

import {generateWordID} from '../../../helpers';
import {red} from '../../../color';

const styles = StyleSheet.create({
  errorTip: {color: red, fontSize: 16},
});

export let submitExternal = () => {};

const WordForm = ({word, onSave}) => {
  const {
    word: dWord = '',
    meaning: dMeaning = '',
    synonyms: dSynonyms = '',
    context: dContext = '',
  } = word || {};

  const onValidate = values => ({
    word: !values.word ? 'Required' : undefined,
    meaning: !values.meaning ? 'Required' : undefined,
  });

  const onSubmit = values =>
    onSave({...values, id: word ? word.id : generateWordID(values.word)});

  return (
    <Form
      onSubmit={onSubmit}
      validate={onValidate}
      render={({handleSubmit, submitError}) => {
        submitExternal = handleSubmit;
        return (
          <>
            <Field name="word" placeholder="Word" initialValue={dWord}>
              {fieldProps => <FormInput {...fieldProps} label="Word:" />}
            </Field>
            <Field name="meaning" placeholder="Meaning" initialValue={dMeaning}>
              {fieldProps => <FormInput {...fieldProps} label="Meaning:" />}
            </Field>
            <Field
              name="synonyms"
              placeholder="Synonyms"
              initialValue={dSynonyms}>
              {fieldProps => (
                <FormInput {...fieldProps} label="Synonyms:" multiline={true} />
              )}
            </Field>
            <Field name="context" placeholder="Context" initialValue={dContext}>
              {fieldProps => (
                <FormInput {...fieldProps} label="Context:" multiline={true} />
              )}
            </Field>
            {submitError && <Text style={styles.errorTip}>{submitError}</Text>}
          </>
        );
      }}
    />
  );
};

export default WordForm;
