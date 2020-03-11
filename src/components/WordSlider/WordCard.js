import React from 'react';
import {View, Text} from 'react-native';
import {wordCardStyles as styles} from './styles';

const WordCard = ({item, mode, isShown = false}) => {
  let content;
  if (mode === 'Word') {
    content = <Text style={styles.text}>{item.word}</Text>;
  } else if (mode === 'Meaning') {
    content = <Text style={styles.text}>{item.meaning}</Text>;
  }
  return (
    <View style={styles.wordCardWrapper}>
      <View style={styles.wordCard}>
        {isShown || mode === 'All' ? (
          <>
            <Text style={styles.text}>{item.word}</Text>
            <Text style={[styles.text, styles.divider]}>●</Text>
            <Text style={styles.text}>{item.meaning}</Text>
          </>
        ) : (
          content
        )}
      </View>
    </View>
  );
};

export default WordCard;
