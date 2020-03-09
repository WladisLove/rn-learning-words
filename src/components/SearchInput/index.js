import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import ButtonIcon from '../ButtonIcon';
import close from '../../assets/close.png';
import {gray} from '../../color';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    fontSize: 18,
  },
  closeBtn: {marginRight: 0},
  closeIcon: {width: 20, height: 20},
});

const SearchInput = ({searchQuery, setSearchQuery}) => {
  const turnFindModeOff = () => setSearchQuery(null);

  return (
    <>
      <TextInput
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        value={searchQuery}
        style={styles.input}
      />
      <ButtonIcon
        src={close}
        style={styles.closeBtn}
        iconStyle={styles.closeIcon}
        onPress={turnFindModeOff}
      />
    </>
  );
};

export default SearchInput;
