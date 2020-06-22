import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Picker as RNPicker} from 'react-native';
import Button from '../Button';
import Popup from '../popups/Popup';
import {isIOS} from '../../helpers';
import styles from './styles';

// TODO: add ScrollArea for android picker modal
// TODO: add max-height for android picker modal content

const Picker = ({text, value, onChange, data = []}) => {
  const [tmpValue, setTmpValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const openPicker = () => setVisible(true);
  const closePicker = () => setVisible(false);

  const onSelectValue = val => {
    onChange(val);
    closePicker();
  };

  const iOSPicker = (
    <View style={styles.modalContent}>
      <RNPicker
        selectedValue={tmpValue}
        onValueChange={val => setTmpValue(val)}>
        {data.map(el => (
          <RNPicker.Item key={el} label={el} value={el} />
        ))}
      </RNPicker>
      <View style={styles.okBtnContainer}>
        <Button onPress={onSelectValue.bind(null, tmpValue)}>OK</Button>
      </View>
    </View>
  );

  const androidPicker = (
    <>
      {data.map(el => (
        <TouchableOpacity
          key={el}
          onPress={onSelectValue.bind(null, el)}
          style={styles.pickerItem}>
          <Text style={styles.pickerItemText}>{el}</Text>
        </TouchableOpacity>
      ))}
    </>
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{text}</Text>
      <Button
        onPress={openPicker}
        style={styles.selectBtn}
        textStyle={styles.selectBtnText}>
        {value}
      </Button>
      <Popup
        visible={visible}
        onClose={closePicker}
        style={styles.pickerContent}>
        {isIOS ? iOSPicker : androidPicker}
      </Popup>
    </View>
  );
};

export default Picker;
