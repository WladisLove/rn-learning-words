import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Button, Alert} from 'react-native';
import WordModal from '../../components/modals/WordModal';
import VocabularyScreenHeader from '../../components/VocabularyScreenHeader';
import WordsList from '../../components/WordsList';

import styles from './styles';

const Vocabulary = ({
  vocabulary = {},
  vocabularyId,
  navigation,
  deleteVocabulary,
  setWord,
}) => {
  const [wordModalVisible, setWordModalVisible] = useState(false);
  const openWordModal = () => setWordModalVisible(true);
  const closeWordModal = () => setWordModalVisible(false);

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

  console.log('vocabulary', vocabulary);

  return (
    <SafeAreaView style={styles.root}>
      <VocabularyScreenHeader
        vocabulary={vocabulary}
        onBack={goBack}
        onAdd={openWordModal}
        onEdit={() => {}}
        onDelete={onDelete}
      />
      <ScrollView bounces={false} contentContainerStyle={styles.body}>
        <WordsList items={vocabulary.words} />
      </ScrollView>
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
