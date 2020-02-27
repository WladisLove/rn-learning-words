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

const VocabularyList = ({items = [], onPress}) => {
  const pressHandler = id => () => onPress(id);
  return (
    <View>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={pressHandler(item.id)}
          style={styles.container}>
          <Text style={styles.text}>{item.name}</Text>
          <Image source={arrowRight} style={styles.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default VocabularyList;
