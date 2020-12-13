import {StyleSheet} from 'react-native';

const iconBtnWidth = 23;
const iconBtnPadding = 5;
const iconBtnRightMargin = 12;

export const iconBtnCompleteWidth =
  iconBtnWidth + iconBtnRightMargin + iconBtnPadding * 2;

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
  btn: {
    marginLeft: 0,
    marginRight: iconBtnRightMargin,
    padding: iconBtnPadding,
  },
  btnIcon: {width: iconBtnWidth, height: 23},
  addWordBtnWrapper: {flex: 1, alignItems: 'flex-end'},
  verticalSeparator: {
    marginRight: iconBtnRightMargin,
    backgroundColor: 'black',
    width: 1,
    height: 26,
  },
});

export const formStyles = StyleSheet.create({
  field: {paddingTop: 0, paddingBottom: 0},
  input: {backgroundColor: 'transparent'},
  vocActionsContainer: actionsContainerStyle,
});
