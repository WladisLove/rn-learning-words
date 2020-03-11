import {StyleSheet} from 'react-native';
import {green_light, silver} from '../../color';

const styles = StyleSheet.create({
  root: {backgroundColor: green_light, flex: 1},
  showRestMargings: {marginVertical: 15},
  cardsWrapper: {paddingHorizontal: 40},
  title: {fontSize: 16, marginBottom: 5},
  card: {
    padding: 20,
    backgroundColor: silver,
    borderRadius: 5,
    marginBottom: 20,
  },
  centeredCard: {alignItems: 'center'},
  minus: {width: 30, height: 1, backgroundColor: 'black'},
  text: {fontSize: 18},
  contextText: {fontSize: 18},
});

export default styles;
