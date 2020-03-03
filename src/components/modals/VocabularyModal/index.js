import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Form, Field} from 'react-final-form';
import Modal from '../Modal';
import FormInput from '../../FormInput';

import {FORM_ERROR} from 'final-form';
import {generateVocabularyID} from '../../../utils';
import {red} from '../../../color';

const styles = StyleSheet.create({
  errorTip: {color: red, fontSize: 16},
});

const VocabularyModal = ({visible, items, onSave, onClose}) => {
  const onValidate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required field';
    }
    return errors;
  };

  const onSubmit = values => {
    const name = values.name.trim();
    const id = generateVocabularyID(name);
    let isUnique = !Object.keys(items).some(itemId => itemId === id);
    if (!isUnique) {
      return {[FORM_ERROR]: "Name isn't unique"};
    }
    onSave({name, id});
  };

  let submitExternal = () => {};
  const submitExternalHandler = () => submitExternal();

  return (
    <Modal
      visible={visible}
      okText="Submit"
      onCancel={onClose}
      onOk={submitExternalHandler}>
      <Form
        onSubmit={onSubmit}
        validate={onValidate}
        render={({handleSubmit, submitError}) => {
          submitExternal = handleSubmit;
          return (
            <>
              <Field name="name" placeholder="Vocabulary name">
                {fieldProps => <FormInput {...fieldProps} />}
              </Field>
              {submitError && (
                <Text style={styles.errorTip}>{submitError}</Text>
              )}
            </>
          );
        }}
      />
    </Modal>
  );
};

export default VocabularyModal;
