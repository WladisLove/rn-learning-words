import React, {useState} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import ButtonLvl from '../../components/ButtonLvl';
import WordModal from '../../components/modals/WordModal';
import VocabularyScreenHeader from '../../components/VocabularyScreenHeader';
import WordsList from '../../components/WordsList';
import ActionsPopup from '../../components/popups/ActionsPopup';
import VocListPopup from '../../components/popups/VocListPopup';
import useModal from '../../helpers/useModal';
import {downloadVocabulary} from '../../helpers';
import {routes} from '../index';

import styles from './styles';

const Vocabulary = ({
  vocabulary = {},
  vocabularyId,
  vocList,
  isLandscape,
  navigation,
  deleteVocabulary,
  changeVocabularyName,
  setWord,
  deleteWord,
  moveWord,
}) => {
  const {words = {}} = vocabulary;
  const [wordModalVisible, openWordModal, closeWordModal] = useModal(false);
  const [actionsVisible, openActions, closeActions] = useModal(false);
  const [vocListVisible, openVocList, closeVocList] = useModal(false);
  const [selectedWordID, selectWordID] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [wordsLvl, setWordsLvl] = useState(0);

  const onCloseActionsPopup = () => {
    closeActions();
    selectWordID(null);
  };

  const onCloseVocListPopup = () => {
    closeVocList();
    selectWordID(null);
  };

  const goBack = () => navigation.goBack();
  const deleteHandler = () => {
    deleteVocabulary(vocabularyId);
    goBack();
  };
  const onDelete = () =>
    Alert.alert('Do you want to delete vocabulary?', '', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', onPress: deleteHandler},
    ]);

  const onChangeName = (name, newId) => {
    changeVocabularyName(vocabularyId, newId, name);
    navigation.setParams({vocabularyId: newId});
  };

  const onSetWord = word => {
    setWord(word, vocabularyId);
    closeWordModal();
    selectWordID(null);
  };

  const onCloseWord = () => {
    closeWordModal();
    closeActions();
    selectWordID(null);
  };

  const onUpdateWord = word => setWord(word, vocabularyId);

  const onDeleteWord = () => {
    selectedWordID && deleteWord(selectedWordID, vocabularyId);
    onCloseWord();
  };

  const onDownload = () =>
    downloadVocabulary(
      vocabulary,
      text => Alert.alert('Write success!', `${text}`),
      text => Alert.alert('Write error!', `${text}`),
    );

  const onRun = () =>
    navigation.push(routes.LEARN_VOCABULARY, {vocabularyId, wordsLvl});

  const onWordPress = wordID => {
    selectWordID(wordID);
    openWordModal();
  };

  const onWordLongPressVoc = vocId => {
    openActions();
    selectWordID(vocId);
  };

  const onEditAction = () => {
    closeActions();
    openWordModal();
  };

  const onShowVocList = () => {
    closeActions();
    openVocList();
  };

  const onMoveWord = toVocId => {
    moveWord(selectedWordID, vocabularyId, toVocId);
    onCloseVocListPopup();
  };

  const selectedWord = selectedWordID ? words[selectedWordID] : null;
  const sortedWords =
    wordsLvl === 0
      ? Object.values(words)
      : Object.values(words).filter(({lvl = 2}) => lvl === wordsLvl);

  const popupActions = [
    {
      name: 'Edit',
      handler: onEditAction,
    },
    {
      name: 'Delete',
      handler: onDeleteWord,
    },
    {
      name: 'Move',
      handler: onShowVocList,
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.root}>
        <VocabularyScreenHeader
          vocabulary={vocabulary}
          onBack={goBack}
          onEdit={onChangeName}
          onDelete={onDelete}
          onDownload={onDownload}
          onRun={onRun}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAdd={openWordModal}
        />
        <View style={styles.lvlBtnsContainer}>
          {[0, 1, 2, 3].map(lvl => (
            <ButtonLvl
              key={lvl}
              lvl={lvl}
              selectedLvl={wordsLvl}
              onPress={setWordsLvl.bind(null, lvl)}
              style={styles.lvlBtn}
            />
          ))}
        </View>
        <WordsList
          items={sortedWords}
          onPress={onWordPress}
          onLongPress={onWordLongPressVoc}
          searchQuery={searchQuery}
        />
      </SafeAreaView>
      <ActionsPopup
        visible={actionsVisible}
        onClose={onCloseActionsPopup}
        actions={popupActions}
        textHeader={
          <>
            Actions with word{' '}
            <Text style={styles.bold}>{selectedWord?.word}</Text>
          </>
        }
      />
      <VocListPopup
        visible={vocListVisible}
        onSelectVoc={onMoveWord}
        onClose={onCloseVocListPopup}
        selectedWord={selectedWord}
        vocList={vocList}
        vocId={vocabularyId}
      />
      <WordModal
        visible={wordModalVisible}
        word={selectedWord}
        onSave={onSetWord}
        onClose={onCloseWord}
        onUpdate={onUpdateWord}
        onDelete={onDeleteWord}
        isLandscape={isLandscape}
      />
    </>
  );
};

export default Vocabulary;
