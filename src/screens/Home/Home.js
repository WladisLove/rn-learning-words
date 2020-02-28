import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import AppMotto from '../../components/AppMotto';
import VocabularyList from '../../components/VocabularyList';
import {routes} from '../index';
import styles from './styles';

const Home = ({vocabularies, setVocabulary, navigation}) => {
  const onPressVocabulary = vocabularyId =>
    navigation.navigate(routes.VOCABULARY, {vocabularyId});

  const onAddVocabulary = () => {
    console.log('onAddVocabulary')
    /*const num = Math.floor(Math.random() * 100) + 1;
    setVocabulary({
      name: `Kek ${num}`,
      id: `kek-${num}`,
    });*/
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar />
      <ScrollView bounces={false}>
        <AppMotto />
        <View style={styles.body}>
          <Text style={styles.headerText}>Your Vocabularies:</Text>
          <View style={styles.splitLine} />
          {/* vocabulary's names must be uniqe */}
          <VocabularyList items={vocabularies} onPress={onPressVocabulary} />
        </View>
      </ScrollView>
      <Button title="Add vocabulary" onPress={onAddVocabulary} />
    </SafeAreaView>
  );
};

export default Home;
