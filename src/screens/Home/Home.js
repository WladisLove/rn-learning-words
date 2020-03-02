import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';
import AppMotto from '../../components/AppMotto';
import VocabularyList from '../../components/VocabularyList';
import VocabularyModal from '../../components/VocabularyModal';
import {routes} from '../index';
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
