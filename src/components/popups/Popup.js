import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import {gray} from '../../color';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: 'white',
    minWidth: 150,
    maxWidth: 300,
    padding: 10,
    borderRadius: 15,
    borderColor: gray,
    borderWidth: 1,
    alignItems: 'center',
  },
});

const Popup = ({visible, onClose, children}) => {
  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'landscape']}>
      <TouchableOpacity
        style={styles.root}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={styles.wrapper}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Popup;
