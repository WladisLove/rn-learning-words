import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../Button';
import {secondaryFields} from './WordForm';
import {navy_dark, green_light} from '../../../color';

const styles = StyleSheet.create({
  mainField: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: navy_dark,
  },
  separatorWrapper: {alignItems: 'center', paddingVertical: 9},
  separator: {
    backgroundColor: green_light,
    height: 3,
    width: 45,
    textAlign: 'center',
  },
  section: {marginTop: 12},
  sectionTitle: {fontSize: 14, marginBottom: 5, paddingLeft: 10},
  sectionText: {fontSize: 18},
  btnContainer: {flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12},
});

const WordInfoArea = ({word = {}, onEdit, onDelete}) => {
  return (
    <View>
      <Text style={styles.mainField}>{word.word}</Text>
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
      </View>
      <Text style={styles.mainField}>{word.meaning}</Text>
      {secondaryFields.map((name, i) => {
        return word[name] ? (
          <View
            key={name}
            style={styles.section}>
            <Text style={styles.sectionTitle}>
              - {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
            <Text style={styles.sectionText} selectable>{word[name]}</Text>
          </View>
        ) : null;
      })}
      <View style={styles.btnContainer}>
        <Button onPress={onEdit} style={{marginRight: 10}}>
          Edit
        </Button>
        <Button onPress={onDelete}>Delete</Button>
      </View>
    </View>
  );
};

export default WordInfoArea;
