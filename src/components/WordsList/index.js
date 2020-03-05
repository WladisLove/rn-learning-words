import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {black, navy_dark, silver} from '../../color';

const styles = StyleSheet.create({
  body: {flex: 1, backgroundColor: silver},
  listItem: {
    flexDirection: 'row',
    maxHeight: 90,
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  separator: {
    backgroundColor: black,
    flex: 1,
    height: 1,
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

const WordsList = ({items = {}, onWordPress = () => {}}) => {
  return (
    <FlatList
      bounces={false}
      style={styles.body}
      data={Object.values(items)}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.listItem}
          onPress={onWordPress.bind(null, item)}>
          <Text style={[styles.text, styles.word]}>{item.word}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={[styles.text, styles.meaning]}>{item.meaning}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
    />
  );
};

export default WordsList;
