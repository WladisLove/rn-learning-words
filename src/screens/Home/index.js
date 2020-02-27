import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import VocabularyList from '../../components/VocabularyList';
import {routes} from '../index';
import styles from './styles';

const Home = ({navigation, ...props}) => {
  const onPressVocabulary = vocabularyId =>
    navigation.navigate(routes.VOCABULARY, {vocabularyId});

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar />
      <ScrollView bounces={false}>
        <View>
          <Text>Header</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.headerText}>Your Vocabularies:</Text>
          <View style={styles.splitLine} />
          {/* vocabulary's names must be uniqe */}
          <VocabularyList
            items={[
              {
                name: 'Test Voc',
                id: 'test-voc',
              },
              {
                name: 'English words',
                id: 'english-words',
              },
              {
                name: 'English phrases',
                id: 'english-phrases',
              },
            ]}
            onPress={onPressVocabulary}
          />
        </View>
      </ScrollView>
      <Button title="Add vocabulary" onPress={() => {}} />
    </SafeAreaView>
  );
};

export default Home;
