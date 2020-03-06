import {StyleSheet} from 'react-native';
import {green_light, silver} from '../../color';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: green_light},
  scrollView: {flex: 1, backgroundColor: silver},
  body: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 24,
  },
  headerText: {
    color: 'blue',
    fontSize: 20,
    fontWeight: '700',
    padding: 4,
  },
  splitLine: {
    backgroundColor: 'black',
    width: '100%',
    height: 1,
    marginVertical: 7,
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
});

export default styles;
