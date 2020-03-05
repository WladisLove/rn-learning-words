import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import WordForm, {submitExternal} from './WordForm';
import WordInfoArea from './WordInfoArea';

const VocabularyModal = props => {
  const {visible, word, onSave, onClose, onUpdate, onDelete} = props;
  const [editable, setEditable] = useState(!word);
  const onStartEdit = () => setEditable(true);

  useEffect(() => setEditable(!word), [visible]);

  const updateHandler = w => {
    onUpdate(w);
    setEditable(false);
  };

  const onApplyChanges = word ? updateHandler : onSave;
  const onCancelChanges = word ? () => setEditable(false) : onClose;

  const modalBtnConfig = editable
    ? {
        okText: 'Submit',
        onOk: () => submitExternal(), // important to use in such way
        onCancel: onCancelChanges,
      }
    : {
        cancelText: 'Close',
        onCancel: onClose,
      };

  return (
    <Modal visible={visible} {...modalBtnConfig}>
      {editable ? (
        <WordForm word={word} onSave={onApplyChanges} />
      ) : (
        <WordInfoArea word={word} onEdit={onStartEdit} onDelete={onDelete} />
      )}
    </Modal>
  );
};

export default VocabularyModal;
