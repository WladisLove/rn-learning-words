import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Form, Field} from 'react-final-form';
import Modal from '../Modal';
import FormInput from '../../FormInput';

import {red} from '../../../color';

const styles = StyleSheet.create({
  errorTip: {color: red, fontSize: 16},
});

const VocabularyModal = ({visible, onSave, onClose}) => {
  const onValidate = values => ({
    word: !values.word ? 'Required' : undefined,
    meaning: !values.meaning ? 'Required' : undefined,
  });

  const onSubmit = values => {
    // TODO: use words's current ID when change the word
    const idStr = values.word.toLowerCase().replace(/ /gi, '-');
    const idDate = Date.now()
      .toString()
      .slice(-7, -2);
    const id = `${idStr}-${idDate}`;
    onSave({...values, id});
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
              <Field name="word" placeholder="Word">
                {fieldProps => <FormInput {...fieldProps} label="Word:" />}
              </Field>
              <Field name="meaning" placeholder="Meaning">
                {fieldProps => <FormInput {...fieldProps} label="Meaning:" />}
              </Field>
              <Field name="synonyms" placeholder="Synonyms">
                {fieldProps => (
                  <FormInput
                    {...fieldProps}
                    label="Synonyms:"
                    multiline={true}
                    numberOfLines={3}
                  />
                )}
              </Field>
              <Field name="context" placeholder="Context">
                {fieldProps => (
                  <FormInput
                    {...fieldProps}
                    label="Context:"
                    multiline={true}
                    numberOfLines={3}
                  />
                )}
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
