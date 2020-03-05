import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {wordFields} from './WordForm';

const styles = StyleSheet.create({
  mainField: {
    textAlign: 'center',
  },
  mainSeparator: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 5,
  },
  fstSection: {marginTop: 15},
  section: {
    marginBottom: 7,
  },
  sectionTitle: {},
  sectionText: {
    fontSize: 18,
  },
  btnContainer: {flexDirection: 'row', justifyContent: 'flex-end'},
});

const [, , ...restFields] = wordFields; // skip 'word' and 'meaning' fields

const VocabularyModal = ({word = {}, onEdit, onDelete}) => {
  return (
    <View>
      <Text style={styles.mainField}>{word.word}</Text>
      <Text style={styles.mainSeparator}>-•-</Text>
      <Text style={styles.mainField}>{word.meaning}</Text>
      {restFields.map((name, i) => {
        return word[name] ? (
          <View
            key={name}
            style={[styles.section, i === 0 && styles.fstSection]}>
            <Text style={styles.sectionTitle}>
              {name.charAt(0).toUpperCase() + name.slice(1)}:
            </Text>
            <Text style={styles.sectionText}>{word[name]}</Text>
          </View>
        ) : null;
      })}
      <View style={styles.btnContainer}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} />
      </View>
    </View>
  );
};

export default VocabularyModal;
