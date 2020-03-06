import React from 'react';
import {
  Modal as RNModal,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Button from '../Button';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: 'white',
    width: '85%',
    maxWidth: 350,
    marginVertical: 40,
    paddingVertical: 20,
  },
  scrollViewContent: {paddingHorizontal: 10},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const Modal = ({
  visible,
  animationType = 'fade',
  okText = 'OK',
  cancelText = 'Cancel',
  onCancel,
  onOk,
  children,
}) => {
  return (
    <RNModal
      animationType={animationType}
      transparent
      visible={visible}
      onRequestClose={onCancel}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.mainContainer}>
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
