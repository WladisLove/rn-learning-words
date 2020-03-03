import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';
import AppMotto from '../../components/AppMotto';
import VocabularyList from '../../components/VocabularyList';
import VocabularyModal from '../../components/modals/VocabularyModal';
import {routes} from '../index';
import {loadVocabulary} from '../../utils';
import styles from './styles';

const Home = ({vocabularies, setVocabulary, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const onPressVocabulary = vocabularyId =>
    navigation.navigate(routes.VOCABULARY, {vocabularyId});

  const onSaveVocabulary = voc => {
    console.log('onAddVocabulary', voc);
    setVocabulary(voc);
    setModalVisible(false);
  };

  const onLoadVocabulary = () => {
    // TODO: add loading state while processing new vocabulary
    const finishLoading = () => console.log('finished');
    loadVocabulary(Object.keys(vocabularies), setVocabulary, finishLoading);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/*<StatusBar />*/}
      <ScrollView bounces={false}>
        <AppMotto />
        <View style={styles.body}>
          <Text style={styles.headerText}>Your Vocabularies:</Text>
          <View style={styles.splitLine} />
          <VocabularyList
            vocabularies={vocabularies}
            onPress={onPressVocabulary}
          />
        </View>
      </ScrollView>
      <Button title="Add vocabulary" onPress={showModal} />
      <Button title="Upload vocabulary" onPress={onLoadVocabulary} />
      <VocabularyModal
        visible={modalVisible}
        onSave={onSaveVocabulary}
        onClose={closeModal}
        items={vocabularies}
      />
    </SafeAreaView>
  );
};

export default Home;
