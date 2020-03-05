import React from 'react';
import Modal from '../Modal';
import WordForm, {submitExternal} from './WordForm';

const VocabularyModal = props => {
  const {visible, word, onSave, onClose} = props;

  const submitExternalHandler = () => submitExternal();

  return (
    <Modal
      visible={visible}
      okText="Submit"
      onCancel={onClose}
      onOk={submitExternalHandler}>
      {<WordForm word={word} onSave={onSave} />}
    </Modal>
  );
};

export default VocabularyModal;
