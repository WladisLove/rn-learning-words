import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import WordModal from '../../components/modals/WordModal';
import arrowRight from '../../assets/arrow-right.png';
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.iconWrapper}>
          <Image source={arrowRight} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.vocInfoContainer}>
          <Text style={styles.title}>{vocabulary.name}</Text>
          <View style={styles.vocActionsContainer}>
            <Button title="Add" onPress={openWordModal} />
            <Button title="Edit" />
            <Button title="Delete" onPress={onDelete} />
          </View>
        </View>
      </View>
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
