import React from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import AppMotto from '../../components/AppMotto';
import VocabularyList from '../../components/VocabularyList';
import VocabularyModal from '../../components/modals/VocabularyModal';
import Button from '../../components/Button';
import {routes} from '../index';
import {loadVocabulary} from '../../helpers';
import useModal from '../../helpers/useModal';
import styles from './styles';

const Home = ({vocabularies, setVocabulary, navigation}) => {
  const [modalVisible, showModal, closeModal] = useModal(false);

  const onPressVocabulary = vocabularyId =>
    navigation.navigate(routes.VOCABULARY, {vocabularyId});

  const onSaveVocabulary = voc => {
    console.log('onAddVocabulary', voc);
    setVocabulary(voc);
    closeModal();
  };

  const onLoadVocabulary = () => {
    // TODO: add loading state while processing new vocabulary
    const finishLoading = () => console.log('finished');
    loadVocabulary(Object.keys(vocabularies), setVocabulary, finishLoading);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/*<StatusBar />*/}
      <ScrollView bounces={false} style={styles.scrollView}>
        <AppMotto />
        <View style={styles.body}>
          <Text style={styles.headerText}>Your Vocabularies</Text>
          <View style={styles.splitLine} />
          <VocabularyList
            vocabularies={vocabularies}
            onPress={onPressVocabulary}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBtnContainer}>
        <Button onPress={onLoadVocabulary}>Upload vocabulary</Button>
        <Button onPress={showModal}>Add vocabulary</Button>
      </View>
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
