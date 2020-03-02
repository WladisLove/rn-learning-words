import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';
import WordModal from '../../components/modals/WordModal';
import VocabularyScreenHeader from '../../components/VocabularyScreenHeader';

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
  const onDelete = () => {
    deleteVocabulary(vocabularyId);
    goBack();
  };

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
      <ScrollView bounces={false}>
        <View style={styles.body}>
          <Text style={styles.headerText}>Your Vocabularies:</Text>
          <Text style={styles.headerText}>Your Vocabularies:</Text>
          <Text style={styles.headerText}>Your Vocabularies:</Text>
          {/*<VocabularyList items={[]} onPress={() => {}} />*/}
        </View>
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
