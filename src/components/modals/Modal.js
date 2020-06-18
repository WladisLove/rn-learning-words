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
    backgroundColor: 'white',
    width: '85%',
    maxWidth: 350,
    marginVertical: 40,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  prefixContainer: {
    position: 'relative',
    height: 30,
    width: '100%',
    marginBottom: 10,
  },
  scrollViewContent: {paddingHorizontal: 10},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  closeBtn: {padding: 5, position: 'absolute', right: 7},
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
  prefixContent = null,
  children,
  contentStyle = {},
}) => {
  return (
    <RNModal
      animationType={animationType}
      transparent
      visible={visible}
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'landscape']}>
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.mainContainer, contentStyle]}>
          <View style={styles.prefixContainer}>
            {prefixContent}
            <ButtonIcon
              src={close}
              onPress={onClose}
              iconStyle={styles.closeIcon}
              style={styles.closeBtn}
            />
          </View>
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
