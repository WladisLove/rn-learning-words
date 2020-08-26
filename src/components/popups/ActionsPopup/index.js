import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Popup from '../Popup';

const styles = StyleSheet.create({
  popupItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
  popupItemText: {
    fontSize: 20,
    textAlign: 'center',
  },
  popupHeaderText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

const ActionsPopup = ({visible, onClose, actions = [], textHeader}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Text style={styles.popupHeaderText}>{textHeader}</Text>
      {actions.map(
        el =>
          el && (
            <TouchableOpacity
              key={el.name}
              onPress={el.handler}
              style={styles.popupItem}>
              <Text style={styles.popupItemText}>{el.name}</Text>
            </TouchableOpacity>
          ),
      )}
    </Popup>
  );
};

export default ActionsPopup;
