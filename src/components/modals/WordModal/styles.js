import {StyleSheet} from 'react-native';
import {red} from '../../../color';

export const modalStyles = StyleSheet.create({
  content: {paddingBottom: 10},
  contentL: {maxWidth: 500, marginVertical: 30},
  lvlBtn: {borderRadius: 5},
});

export const formStyles = StyleSheet.create({
  errorTip: {color: red, fontSize: 16},
  mainFieldsContainer: {marginBottom: 10},
  mainFieldsContainerL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mainFieldL: {flex: 0.49},
});
