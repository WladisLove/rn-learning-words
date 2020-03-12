import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../Button';
import {wordFields} from './WordForm';
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
  fstSection: {marginTop: 15},
  section: {marginBottom: 12},
  sectionTitle: {fontSize: 14, marginBottom: 5, paddingLeft: 10},
  sectionText: {fontSize: 18},
  btnContainer: {flexDirection: 'row', justifyContent: 'flex-end'},
});

const [, , ...restFields] = wordFields; // skip 'word' and 'meaning' fields

const WordInfoArea = ({word = {}, onEdit, onDelete, isLandscape}) => {
  return (
    <View>
      <Text style={styles.mainField}>{word.word}</Text>
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
      </View>
      <Text style={styles.mainField}>{word.meaning}</Text>
      {restFields.map((name, i) => {
        return word[name] ? (
          <View
            key={name}
            style={[styles.section, i === 0 && styles.fstSection]}>
            <Text style={styles.sectionTitle}>
              - {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
            <Text style={styles.sectionText}>{word[name]}</Text>
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
