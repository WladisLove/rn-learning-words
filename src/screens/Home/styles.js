import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: 'white'},
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
});

export default styles;
