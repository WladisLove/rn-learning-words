import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {black, navy_dark} from '../../color';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: black,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
  },
  word: {
    flex: 0.44,
    fontWeight: '700',
    color: navy_dark,
  },
  dot: {fontSize: 32, fontWeight: '700', marginHorizontal: 10},
  meaning: {flex: 0.44, textAlign: 'right'},
});

const WordsList = ({items = {}}) => {
  let elements = [];
  for (let [id, item] of Object.entries(items)) {
    elements.push(
      <View key={id} style={styles.listItem}>
        <Text style={[styles.text, styles.word]}>{item.word}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={[styles.text, styles.meaning]}>{item.meaning}</Text>
      </View>,
    );
  }

  return <>{elements}</>;
};

export default WordsList;
