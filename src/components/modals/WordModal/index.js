import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import WordForm, {submitExternal} from './WordForm';
import WordInfoArea from './WordInfoArea';
import ButtonLvl from '../../ButtonLvl';
import WordLvlPopup from '../../popups/WordLvlPopup';
import useModal from '../../../helpers/useModal';
import {modalStyles as styles} from './styles';

const DEFAULT_WORD_LVL = 2;

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
  const withWord = Boolean(word);
  const [lvl, setLvl] = useState(word?.lvl || DEFAULT_WORD_LVL);
  const [editable, setEditable] = useState(!withWord);
  const [lvlModalVisible, openLvlModal, closeLvlModal] = useModal(false);

  const onStartEdit = () => setEditable(true);
  const resetLvl = () => setLvl(DEFAULT_WORD_LVL);

  useEffect(() => setEditable(!withWord), [visible]);
  useEffect(() => setLvl(word?.lvl || DEFAULT_WORD_LVL), [word, word?.lvl]);

  const updateHandler = w => {
    onUpdate(w);
    setEditable(false);
  };

  const setWordLvl = _lvl => {
    withWord ? updateHandler({...word, lvl: _lvl}) : setLvl(_lvl);
  };

  const closeModal = () => {
    onClose();
    resetLvl();
  };

  const saveWord = w => {
    onSave({...w, lvl});
    resetLvl();
  };

  const onApplyChanges = withWord ? updateHandler : saveWord;
  const onCancelChanges = withWord ? () => setEditable(false) : closeModal;

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
      onClose={closeModal}
      prefixContent={
        <ButtonLvl
          lvl={lvl}
          selectedLvl={lvl}
          onPress={openLvlModal}
          style={styles.lvlBtn}
        />
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
        wordLvl={lvl}
      />
    </Modal>
  );
};

export default WordModal;
