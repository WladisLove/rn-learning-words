import {StyleSheet} from 'react-native';

const actionsContainerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  height: 40,
  marginTop: 5,
};

export const headerStyles = StyleSheet.create({
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
  vocActionsContainer: actionsContainerStyle,
  btn: {marginLeft: 0, marginRight: 15},
  btnIcon: {width: 23, height: 23},
  addWordBtnWrapper: {flex: 1, alignItems: 'flex-end'},
});

export const formStyles = StyleSheet.create({
  field: {paddingTop: 20, paddingBottom: 10},
  input: {backgroundColor: 'transparent'},
  tooltip: {top: 3},
  vocActionsContainer: actionsContainerStyle,
});
