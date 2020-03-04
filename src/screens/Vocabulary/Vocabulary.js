import React from 'react';
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
}) => {
  const [wordModalVisible, openWordModal, closeWordModal] = useModal(false);

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

  console.log('vocabulary', vocabulary);

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
      <WordsList items={vocabulary.words} />
      <Button title="Add word" onPress={openWordModal} />
      <WordModal
        visible={wordModalVisible}
        onSave={onSetWord}
        onClose={closeWordModal}
      />
    </SafeAreaView>
  );
};

export default Vocabulary;
