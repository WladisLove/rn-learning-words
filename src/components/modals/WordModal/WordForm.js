import React from 'react';
import {Text, View} from 'react-native';
import {Form, Field} from 'react-final-form';
import FormInput from '../../FormInput';

import {generateWordID} from '../../../helpers';
import {DEFAULT_WORD_LVL} from '../../../constants';
import {formStyles as styles} from './styles';

const mainFields = ['word', 'meaning'];
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

  // TODO: add submit from input (by keyboard)
  // TODO: add focus on next field after completing current
  const onSubmit = values =>
    onSave({
      ...values,
      lvl: word?.lvl ?? DEFAULT_WORD_LVL,
      id: witWord ? word.id : generateWordID(values.word),
    });

  const mainFieldsStyle = isLandscape
    ? {
        container: styles.mainFieldsContainerL,
        field: styles.mainFieldL,
      }
    : {};

  return (
    <Form
      onSubmit={onSubmit}
      validate={onValidate}
      render={({handleSubmit, submitError}) => {
        submitExternal = handleSubmit;
        return (
          <>
            <View style={mainFieldsStyle.container}>
              {mainFields.map(name => {
                let conf = fieldsConfig[name];
                return (
                  <Field
                    key={name}
                    name={name}
                    placeholder={conf.placeholder}
                    initialValue={witWord ? word[name] : undefined}>
                    {fieldProps => (
                      <FormInput
                        style={mainFieldsStyle.field}
                        {...fieldProps}
                        {...conf.inputProps}
                        autoCapitalize="none"
                      />
                    )}
                  </Field>
                );
              })}
            </View>
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
