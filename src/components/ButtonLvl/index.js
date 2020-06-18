import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {blue_vivid, gray, green_light} from '../../color';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: gray,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: green_light,
  },
  buttonSelected: {backgroundColor: 'white'},
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  lvlItem: {
    width: 10,
    height: 10,
    marginRight: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: blue_vivid,
  },
  lvlItemFilled: {
    backgroundColor: blue_vivid,
  },
});

const ButtonLvl = ({
  style = {},
  onPress,
  lvl = 0,
  selectedLvl = 0,
  maxLvl = 3,
}) => {
  const btnStyle =
    lvl === selectedLvl
      ? [styles.button, styles.buttonSelected, style]
      : [styles.button, style];

  if (lvl === 0) {
    return (
      <TouchableOpacity onPress={onPress} style={btnStyle}>
        <Text style={styles.text}>All</Text>
      </TouchableOpacity>
    );
  }

  const items = [];
  for (let i = 0; i < maxLvl; i++) {
    i < lvl
      ? items.push(
          <View key={i} style={[styles.lvlItem, styles.lvlItemFilled]} />,
        )
      : items.push(<View key={i} style={styles.lvlItem} />);
  }
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {items}
    </TouchableOpacity>
  );
};

export default ButtonLvl;
