import React from 'react';
import {Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
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
    padding: 20,
    borderRadius: 15,
    borderColor: gray,
    borderWidth: 1,
    alignItems: 'center',
  },
});

const Popup = ({visible, onClose, style = {}, children, screenH}) => {
  const wrapperStyles = [
    styles.wrapper,
    screenH && {maxHeight: screenH - 30},
    style,
  ];
  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'landscape']}>
      <TouchableOpacity style={styles.root} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={wrapperStyles}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const mapStateToProps = ({orientStore}) => ({
  screenH: orientStore.screenH,
});

export default connect(mapStateToProps)(Popup);
