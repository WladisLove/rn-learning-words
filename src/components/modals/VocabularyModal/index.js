import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Form, Field} from 'react-final-form';
import Modal from '../Modal';
import FormInput from '../../FormInput';

import {FORM_ERROR} from 'final-form';
import {generateVocabularyID, isVocIdUnique} from '../../../helpers';
import {red} from '../../../color';

const styles = StyleSheet.create({
  input: {paddingBottom: 20},
  errorTip: {color: red, fontSize: 16, bottom: 1},
});

const VocabularyModal = ({visible, items, onSave, onClose, initialValues}) => {
  const onValidate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required field';
    }
    return errors;
  };

  // TODO: add submit from input (by keyboard)
  const onSubmit = values => {
    const name = values.name.trim();
    const id = generateVocabularyID(name);
    if (!isVocIdUnique(id, Object.keys(items))) {
      return {[FORM_ERROR]: "Name isn't unique"};
    }
    onSave({name, id});
  };

  let submitExternal = () => {};
  const submitExternalHandler = () => submitExternal();

  return (
    <Modal
      visible={visible}
      okText="Add"
      onClose={onClose}
      onOk={submitExternalHandler}>
      <Form
        onSubmit={onSubmit}
        validate={onValidate}
        initialValues={initialValues}
        render={({handleSubmit, submitError}) => {
          submitExternal = handleSubmit;
          return (
            <>
              <Field name="name" placeholder="Vocabulary name">
                {fieldProps => (
                  <FormInput
                    {...fieldProps}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                    autoFocus
                    submitError={submitError}
                    tooltipStyle={styles.errorTip}
                    style={styles.input}
                  />
                )}
              </Field>
            </>
          );
        }}
      />
    </Modal>
  );
};

export default VocabularyModal;
