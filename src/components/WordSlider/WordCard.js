import React from 'react';
import {View, Text} from 'react-native';
import {wordCardStyles as styles} from './styles';

const WordCard = ({
  item,
  mode,
  isShownAll = false,
  isLandscape,
  slideAreaWidth,
}) => {
  let content;

  if (isShownAll) {
    content = (
      <>
        <Text style={[styles.text, isLandscape && styles.textL]}>
          {item.word}
        </Text>
        <View style={styles.divider} />
        <Text style={[styles.text, isLandscape && styles.textL]}>
          {item.meaning}
        </Text>
      </>
    );
  } else if (mode === 'Meaning') {
    content = <Text style={styles.text}>{item.meaning}</Text>;
  } else {
    content = <Text style={styles.text}>{item.word}</Text>;
  }

  return (
    <View style={[styles.wordCardWrapper, {width: slideAreaWidth}]}>
      <View style={[styles.wordCard, isLandscape && styles.wordCardL]}>
        {content}
      </View>
    </View>
  );
};

export default WordCard;
