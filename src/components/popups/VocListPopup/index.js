import React from 'react';
import {TouchableOpacity, Text, View, FlatList, StyleSheet} from 'react-native';
import Popup from '../Popup';
import {silver, green_light, gray} from '../../../color';

const styles = StyleSheet.create({
  listWrapper: {flexDirection: 'row'},
  listBody: {
    flex: 1,
    maxHeight: 250,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: gray,
  },
  itemDivider: {
    backgroundColor: silver,
    height: 1,
  },
  popupItem: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  popupItemText: {
    fontSize: 20,
    textAlign: 'center',
  },
  popupHeaderText: {
    fontSize: 18,
    textAlign: 'center',
  },
  bold: {fontWeight: '700'},
  mainDivider: {
    height: 1,
    backgroundColor: green_light,
    width: 100,
    marginTop: 15,
    marginBottom: 5,
  },
});

const VocListPopup = ({
  visible,
  onClose,
  onSelectVoc,
  selectedWord,
  vocList = [],
  vocId,
}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Text style={styles.popupHeaderText}>
        Select vocabulary to move:{' '}
        <Text style={styles.bold}>{selectedWord?.word}</Text>
      </Text>
      <View style={styles.mainDivider} />
      <View style={styles.listWrapper}>
        <FlatList
          bounces={false}
          style={styles.listBody}
          data={vocList}
          renderItem={({item: {id, name}}) =>
            id !== vocId && (
              <TouchableOpacity
                key={name}
                onPress={onSelectVoc.bind(null, id)}
                style={styles.popupItem}>
                <Text style={styles.popupItemText}>{name}</Text>
              </TouchableOpacity>
            )
          }
          ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>No available vocabularies</Text>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </Popup>
  );
};

export default VocListPopup;
