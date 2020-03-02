import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {flex: 1},
  // header styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconWrapper: {
    marginLeft: 5,
    marginRight: 10,
    paddingHorizontal: 3,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  icon: {
    resizeMode: 'contain',
    maxWidth: 25,
    height: 25,
    transform: [{rotate: '180deg'}],
  },
  vocInfoContainer: {
    flexDirection: 'column',
    flex: 0.85,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    maxHeight: 52,
  },
  vocActionsContainer: {
    flexDirection: 'row',
  },
  body: {backgroundColor: 'blue'},
});

export default styles;
