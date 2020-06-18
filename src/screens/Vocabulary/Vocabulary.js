import React, {useState} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';
import Button from '../../components/Button';
import ButtonLvl from '../../components/ButtonLvl';
import WordModal from '../../components/modals/WordModal';
import VocabularyScreenHeader from '../../components/VocabularyScreenHeader';
import WordsList from '../../components/WordsList';
import useModal from '../../helpers/useModal';
import {downloadVocabulary} from '../../helpers';
import {routes} from '../index';

import styles from './styles';

const Vocabulary = ({
  vocabulary = {},
  vocabularyId,
  isLandscape,
  navigation,
  deleteVocabulary,
  changeVocabularyName,
  setWord,
  deleteWord,
}) => {
  const {words = {}} = vocabulary;
  const [wordModalVisible, openWordModal, closeWordModal] = useModal(false);
  const [selectedWordID, selectWordID] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [wordsLvl, setWordsLvl] = useState(0);

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

  const onLvlSelect = lvl => () => setWordsLvl(lvl);

  const selectedWord = selectedWordID ? words[selectedWordID] : null;
  const sortedWords =
    wordsLvl === 0
      ? Object.values(words)
      : Object.values(words).filter(({lvl = 2}) => lvl === wordsLvl);

  return (
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
        isLandscape={isLandscape}
        onAdd={openWordModal}
      />
      <View style={styles.lvlBtnsContainer}>
        {[0, 1, 2, 3].map(lvl => (
          <ButtonLvl
            key={lvl}
            lvl={lvl}
            selectedLvl={wordsLvl}
            onPress={onLvlSelect(lvl)}
            style={styles.lvlBtn}
          />
        ))}
      </View>
      <WordsList
        items={sortedWords}
        onWordPress={onWordPress}
        searchQuery={searchQuery}
      />
      {!isLandscape && (
        <View style={styles.bottomBtnContainer}>
          <Button onPress={openWordModal}>Add word</Button>
        </View>
      )}
      <WordModal
        visible={wordModalVisible}
        word={selectedWord}
        onSave={onSetWord}
        onClose={onCloseWord}
        onUpdate={onUpdateWord}
        onDelete={onDeleteWord}
        isLandscape={isLandscape}
      />
    </SafeAreaView>
  );
};

export default Vocabulary;
