import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import {Form, Field} from 'react-final-form';
import FormInput from '../../FormInput';

import {generateWordID} from '../../../helpers';
import {formStyles as styles} from './styles';

const mainFields = ['word', 'meaning'];
export const secondaryFields = ['synonyms', 'context'];
const fieldsConfig = {
  word: {
    placeholder: 'Word',
    inputProps: {
      label: 'Word:',
      //onSubmitEditing={handleSubmit}
      returnKeyType: 'next',
    },
  },
  meaning: {
    placeholder: 'Meaning',
    inputProps: {
      label: 'Meaning:',
      returnKeyType: 'next',
    },
  },
  synonyms: {
    placeholder: 'Synonyms',
    inputProps: {
      label: 'Synonyms:',
      multiline: true,
      //returnKeyType: 'next',
    },
  },
  context: {
    placeholder: 'Context',
    inputProps: {
      label: 'Context:',
      multiline: true,
      //returnKeyType: 'done',
    },
  },
};

export let submitExternal = () => {};

const WordForm = ({word, onSave, isLandscape}) => {
  const meaningRef = useRef();
  const synonymsRef = useRef();

  const setRef = name => {
    return name === 'meaning'
      ? meaningRef
      : name === 'synonyms'
      ? synonymsRef
      : undefined;
  };

  const submitEditingHandler = name => () => {
    name === 'word'
      ? meaningRef.current.focus()
      : name === 'meaning'
      ? synonymsRef.current.focus()
      : undefined;
  };

  const witWord = Boolean(word);

  const onValidate = values => ({
    word: !values.word ? 'Required' : undefined,
    meaning: !values.meaning ? 'Required' : undefined,
  });

  // TODO: add submit from input (by keyboard)
  // TODO: add focus on next field after completing current
  const onSubmit = values =>
    onSave({...values, id: witWord ? word.id : generateWordID(values.word)});

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
                        ref={setRef(name)}
                        onSubmitEditing={submitEditingHandler(name)}
                        style={mainFieldsStyle.field}
                        {...fieldProps}
                        {...conf.inputProps}
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
                    <FormInput
                      ref={setRef(name)}
                      {...fieldProps}
                      {...conf.inputProps}
                    />
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
