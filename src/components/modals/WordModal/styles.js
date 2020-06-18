import {StyleSheet} from 'react-native';
import {red} from '../../../color';

export const modalStyles = StyleSheet.create({
  contentL: {maxWidth: 500, marginVertical: 30, paddingTop: 40},
  lvlBtn: {borderRadius: 5},
});

export const formStyles = StyleSheet.create({
  errorTip: {color: red, fontSize: 16},
  mainFieldsContainerL: {flexDirection: 'row', justifyContent: 'space-between'},
  mainFieldL: {flex: 0.49},
});
