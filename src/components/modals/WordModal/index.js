import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import WordForm, {submitExternal} from './WordForm';
import WordInfoArea from './WordInfoArea';
import {modalStyles as styles} from './styles';

const VocabularyModal = props => {
  const {
    visible,
    word,
    onSave,
    onClose,
    onUpdate,
    onDelete,
    isLandscape,
  } = props;
  const withWord = Boolean(word);
  const [editable, setEditable] = useState(!withWord);
  const onStartEdit = () => setEditable(true);

  useEffect(() => setEditable(!withWord), [visible]);

  const updateHandler = w => {
    onUpdate(w);
    setEditable(false);
  };

  const onApplyChanges = withWord ? updateHandler : onSave;
  const onCancelChanges = withWord ? () => setEditable(false) : onClose;

  const modalBtnConfig = editable
    ? {
        okText: withWord ? 'Save' : 'Add',
        onOk: () => submitExternal(), // important to use in such way
        onCancel: withWord ? onCancelChanges : undefined,
      }
    : {};

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      contentStyle={isLandscape ? styles.contentL : {}}
      {...modalBtnConfig}>
      {editable ? (
        <WordForm
          word={word}
          onSave={onApplyChanges}
          isLandscape={isLandscape}
        />
      ) : (
        <WordInfoArea
          word={word}
          onEdit={onStartEdit}
          onDelete={onDelete}
          isLandscape={isLandscape}
        />
      )}
    </Modal>
  );
};

export default VocabularyModal;
