import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import arrowRight from '../../assets/arrow-right.png';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconWrapper: {
    marginLeft: 5,
    marginRight: 10,
    paddingHorizontal: 3,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  icon: {
    resizeMode: 'contain',
    maxWidth: 25,
    height: 25,
    transform: [{rotate: '180deg'}],
  },
  vocInfoContainer: {
    flexDirection: 'column',
    flex: 0.85,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    maxHeight: 52,
  },
  vocActionsContainer: {
    flexDirection: 'row',
  },
});

const VocabularyScreenHeader = ({
  vocabulary = {},
  onBack,
  onAdd,
  onEdit,
  onDelete,
}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBack} style={styles.iconWrapper}>
      <Image source={arrowRight} style={styles.icon} />
    </TouchableOpacity>
    <View style={styles.vocInfoContainer}>
      <Text style={styles.title}>{vocabulary.name}</Text>
      <View style={styles.vocActionsContainer}>
        <Button title="Add" onPress={onAdd} />
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} />
        <Button title="Run" />
        <Button title="Download" />
      </View>
      <Text>Find word</Text>
    </View>
  </View>
);

export default VocabularyScreenHeader;
