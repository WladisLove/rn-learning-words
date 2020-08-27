import {StyleSheet} from 'react-native';
import {silver, green_light} from '../../color';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: green_light},
  body: {flex: 1, backgroundColor: silver},
  bottomBtnContainer: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  lvlBtnsContainer: {
    flexDirection: 'row',
    backgroundColor: green_light,
  },
  lvlBtn: {flex: 1},
  bold: {fontWeight: '700'},
});

export default styles;
