import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Popup from '../Popup';
import ButtonLvl from '../../ButtonLvl';

const styles = StyleSheet.create({
  btnWrapper: {flexDirection: 'row', alignItems: 'center'},
  btn: {borderRadius: 5, marginHorizontal: 5},
  txt: {marginBottom: 10, fontSize: 16},
});

const WordLvlPopup = ({visible, onClose, onSetLvl, wordLvl}) => {
  const handler = lvl => () => {
    lvl !== wordLvl && onSetLvl(lvl);
    onClose();
  };

  return (
    <Popup visible={visible} onClose={onClose}>
      <Text style={styles.txt}>Select level for word</Text>
      <View style={styles.btnWrapper}>
        <ButtonLvl
          lvl={1}
          selectedLvl={wordLvl}
          onPress={handler(1)}
          style={styles.btn}
        />
        <ButtonLvl
          lvl={2}
          selectedLvl={wordLvl}
          onPress={handler(2)}
          style={styles.btn}
        />
        <ButtonLvl
          lvl={3}
          selectedLvl={wordLvl}
          onPress={handler(3)}
          style={styles.btn}
        />
      </View>
    </Popup>
  );
};

export default WordLvlPopup;
