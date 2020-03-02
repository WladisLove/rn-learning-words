import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import arrowRight from '../../assets/arrow-right.png';
import styles from './styles';

const Vocabulary = ({vocabulary, vocabularyId, navigation, ...props}) => {
  const goBack = () => navigation.goBack();
  console.log(vocabulary)
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.iconWrapper}>
          <Image source={arrowRight} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.vocInfoContainer}>
          <Text style={styles.title}>{vocabulary.name}</Text>
          <View style={styles.vocActionsContainer}>
            <Button title="Add" />
            <Button title="Edit" />
            <Button title="Delete" />
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
      <Button title="Add vocabulary" onPress={() => {}} />
    </SafeAreaView>
  );
};

export default Vocabulary;
