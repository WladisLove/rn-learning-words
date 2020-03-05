import React, {useState} from 'react';
import {SafeAreaView, Button, Alert} from 'react-native';
import RNFS from 'react-native-fs';
import WordModal from '../../components/modals/WordModal';
import VocabularyScreenHeader from '../../components/VocabularyScreenHeader';
import WordsList from '../../components/WordsList';
import useModal from '../../helpers/useModal';

import styles from './styles';

const Vocabulary = ({
  vocabulary = {},
  vocabularyId,
  navigation,
  deleteVocabulary,
  setWord,
  deleteWord,
}) => {
  const {words = {}} = vocabulary;
  const [wordModalVisible, openWordModal, closeWordModal] = useModal(false);
  const [selectedWordID, selectWordID] = useState(null);

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

  const onDownload = () => {
    // TODO: set correct directory for saving

    let path = RNFS.DocumentDirectoryPath;
    //let path = '/Users/uklimiankou/Documents' + '/test2.json';
    console.log(path);
    let obj = {test: 'test object 3'};
    // RNFS.mkdir(path)
    //   .then(result => {
    //     console.log('result', result);
    RNFS.writeFile(path + '/test2.json', JSON.stringify(obj), 'utf8')
      .then(success => {
        // RNFS.DownloadDirectoryPath - Android only
        Alert.alert('FILE WRITTEN!', `${path}\n${RNFS.DownloadDirectoryPath}`);
      })
      .catch(err => {
        Alert.alert('Write error!', `${err.message}`);
      });
    // })
    // .catch(err => {
    //   console.warn('err', err);
    // });
  };

  const onWordPress = wordID => {
    selectWordID(wordID);
    openWordModal();
  };

  console.log('vocabulary', vocabulary);

  const selectedWord = selectedWordID ? words[selectedWordID] : null;

  return (
    <SafeAreaView style={styles.root}>
      <VocabularyScreenHeader
        vocabulary={vocabulary}
        onBack={goBack}
        onAdd={openWordModal}
        onEdit={() => {}}
        onDelete={onDelete}
        onDownload={onDownload}
      />
      <WordsList items={words} onWordPress={onWordPress} />
      <Button title="Add word" onPress={openWordModal} />
      <WordModal
        visible={wordModalVisible}
        word={selectedWord}
        onSave={onSetWord}
        onClose={onCloseWord}
        onUpdate={onUpdateWord}
        onDelete={onDeleteWord}
      />
    </SafeAreaView>
  );
};

export default Vocabulary;
