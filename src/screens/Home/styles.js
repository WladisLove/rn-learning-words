import {StyleSheet} from 'react-native';
import {green_light, silver, black} from '../../color';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: green_light},
  scrollView: {flex: 1, backgroundColor: silver},
  body: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 24,
  },
  headerText: {
    color: black,
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 7,
    textAlign: 'right',
  },
  splitLine: {
    backgroundColor: green_light,
    width: '100%',
    height: 3,
    marginVertical: 7,
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
});

export default styles;
