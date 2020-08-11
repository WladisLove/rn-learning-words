import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Form, Field} from 'react-final-form';
import FormInput from '../FormInput';
import Button from '../Button';
import {generateVocabularyID, isVocIdUnique} from '../../helpers';
import {FORM_ERROR} from 'final-form';

import {formStyles as styles} from './styles';

const VocabularyNameForm = ({
  vocabulary = {},
  onSave,
  onCancel,
  names = [],
}) => {
  const onValidate = values => ({
    name: !values.name ? 'Required' : undefined,
  });

  const onSubmit = values => {
    const name = values.name.trim();
    const id = generateVocabularyID(name);
    if (!isVocIdUnique(id, names)) {
      return {[FORM_ERROR]: "Name isn't unique"};
    }
    onSave(name, id);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={onValidate}
      render={({handleSubmit, submitError, pristine}) => {
        const saveHandler = pristine ? onCancel : handleSubmit;
        return (
          <>
            <Field
              name="name"
              placeholder="Vocabulary name"
              initialValue={vocabulary.name}>
              {fieldProps => (
                <FormInput
                  {...fieldProps}
                  submitError={submitError}
                  style={styles.field}
                  inputStyle={styles.input}
                  tooltipStyle={styles.tooltip}
                  autoFocus
                />
              )}
            </Field>
            <View style={styles.vocActionsContainer}>
              <Button style={{marginRight: 20}} onPress={saveHandler}>
                Save
              </Button>
              <Button onPress={onCancel}>Cancel</Button>
            </View>
          </>
        );
      }}
    />
  );
};

const mapStateToProps = ({vocStore: {vocabularies}}) => {
  const vocabulariesNames = Object.keys(vocabularies);
  return {names: vocabulariesNames};
};

export default connect(mapStateToProps)(VocabularyNameForm);
