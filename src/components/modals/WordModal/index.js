import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import WordForm, {submitExternal} from './WordForm';
import WordInfoArea from './WordInfoArea';
import ButtonLvl from '../../ButtonLvl';
import useModal from '../../../helpers/useModal';
import {modalStyles as styles} from './styles';
import {View} from 'react-native';

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

  const setWordLvl = lvl => () => {
    updateHandler({...word, lvl});
    closeLvlModal();
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

      <Modal visible={lvlModalVisible} onClose={closeLvlModal}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <ButtonLvl
            lvl={1}
            selectedLvl={wordLvl}
            onPress={setWordLvl(1)}
            style={styles.lvlBtn}
          />
          <ButtonLvl
            lvl={2}
            selectedLvl={wordLvl}
            onPress={setWordLvl(2)}
            style={styles.lvlBtn}
          />
          <ButtonLvl
            lvl={3}
            selectedLvl={wordLvl}
            onPress={setWordLvl(3)}
            style={styles.lvlBtn}
          />
        </View>
      </Modal>
    </Modal>
  );
};

export default WordModal;
