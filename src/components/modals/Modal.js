import React from 'react';
import {
  Modal as RNModal,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Button from '../Button';
import ButtonIcon from '../ButtonIcon';
import close from '../../assets/close.png';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    position: 'relative',
    backgroundColor: 'white',
    width: '85%',
    maxWidth: 350,
    marginVertical: 40,
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 20,
  },
  scrollViewContent: {paddingHorizontal: 10},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  closeBtn: {padding: 5, position: 'absolute', top: 7, right: 7},
  closeIcon: {width: 17, height: 17},
});

const Modal = ({
  visible,
  animationType = 'fade',
  okText = 'OK',
  cancelText = 'Cancel',
  onCancel,
  onOk,
  onClose,
  children,
}) => {
  return (
    <RNModal
      animationType={animationType}
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.mainContainer}>
          <ButtonIcon
            src={close}
            onPress={onClose}
            iconStyle={styles.closeIcon}
            style={styles.closeBtn}
          />
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollViewContent}>
            {children}
          </ScrollView>
          <View style={styles.btnContainer}>
            {onCancel && <Button onPress={onCancel}>{cancelText}</Button>}
            {onOk && <Button onPress={onOk}>{okText}</Button>}
          </View>
        </View>
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
