import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import arrowRight from '../../assets/arrow-right.png';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingRight: 7,
    marginBottom: 3,
  },
  text: {
    color: 'black',
    fontSize: 18,
    maxWidth: '92%',
    maxHeight: 46,
  },
  icon: {
    resizeMode: 'contain',
    width: '7%',
    height: 23,
  },
});

const VocabularyList = ({vocabularies = {}, onPress, onLongPress}) => {
  const pressHandler = id => () => onPress(id);
  const longPressHandler = id => () => onLongPress(id);

  return (
    <View>
      {Object.keys(vocabularies)
        .sort()
        .map(vocId => (
          <TouchableOpacity
            key={vocId}
            onPress={pressHandler(vocId)}
            onLongPress={longPressHandler(vocId)}
            style={styles.container}>
            <Text style={styles.text}>{vocabularies[vocId].name}</Text>
            <Image source={arrowRight} style={styles.icon} />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default VocabularyList;
