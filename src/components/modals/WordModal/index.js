import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import WordForm, {submitExternal} from './WordForm';
import WordInfoArea from './WordInfoArea';
import ButtonLvl from '../../ButtonLvl';
import WordLvlPopup from '../../popups/WordLvlPopup';
import useModal from '../../../helpers/useModal';
import {modalStyles as styles} from './styles';

const WordModal = props => {
  const {
    visible,
    word,
    onSave,
    onClose,
    onUpdate,
    onDelete,
    isLandscape,
  } = props;
  const {lvl: wordLvl = 2} = word || {};
  const withWord = Boolean(word);
  const [editable, setEditable] = useState(!withWord);
  const [lvlModalVisible, openLvlModal, closeLvlModal] = useModal(false);

  const onStartEdit = () => setEditable(true);

  useEffect(() => setEditable(!withWord), [visible]);

  const updateHandler = w => {
    onUpdate(w);
    setEditable(false);
  };

  const setWordLvl = lvl => {
    updateHandler({...word, lvl});
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
      prefixContent={
        withWord && (
          <ButtonLvl
            lvl={wordLvl}
            selectedLvl={wordLvl}
            onPress={openLvlModal}
            style={styles.lvlBtn}
          />
        )
      }
      contentStyle={isLandscape ? styles.contentL : {}}
      {...modalBtnConfig}>
      {editable ? (
        <WordForm
          word={word}
          onSave={onApplyChanges}
          isLandscape={isLandscape}
        />
      ) : (
        <WordInfoArea word={word} onEdit={onStartEdit} onDelete={onDelete} />
      )}

      <WordLvlPopup
        visible={lvlModalVisible}
        onClose={closeLvlModal}
        onSetLvl={setWordLvl}
        wordLvl={wordLvl}
      />
    </Modal>
  );
};

export default WordModal;
