import React from 'react';
import {Modal, Text, View, Button, StyleSheet} from 'react-native';
import {Form, Field} from 'react-final-form';
import FormInput from '../FormInput';

import {FORM_ERROR} from 'final-form';
import {red} from '../../color';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '85%',
    maxWidth: 350,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  errorTip: {color: red, fontSize: 16},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const VocabularyModal = ({visible, items, onSave, onClose}) => {
  const onValidate = values => {
    const errors = {};
    console.log('validating...');
    if (!values.name) {
      errors.name = 'Required field';
    }
    return errors;
  };

  const onSubmit = values => {
    const name = values.name.trim();
    const nameLowCase = name.toLowerCase();
    let isUnique = !items.some(
      vocabulary => vocabulary.name.toLowerCase() === nameLowCase,
    );
    if (!isUnique) {
      return {[FORM_ERROR]: "Name isn't unique"};
    }
    onSave({
      name,
      id: nameLowCase.replace(/ /gi, '-'),
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Form
            onSubmit={onSubmit}
            validate={onValidate}
            render={({handleSubmit, submitError}) => (
              <View>
                <Field name="name" placeholder="Vocabulary name">
                  {fieldProps => <FormInput {...fieldProps} />}
                </Field>
                {submitError && (
                  <Text style={styles.errorTip}>{submitError}</Text>
                )}
                <View style={styles.btnContainer}>
                  <Button title="Close" onPress={onClose} />
                  <Button title="Submit" onPress={handleSubmit} />
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default VocabularyModal;
