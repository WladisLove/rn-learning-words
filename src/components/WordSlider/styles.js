import {StyleSheet, Dimensions} from 'react-native';

const {width: screenW} = Dimensions.get('window');

const navBtnWidth = 45;
export const scrollableAreaWidth = screenW - navBtnWidth * 2 - 50;
export const itemWidth = scrollableAreaWidth;

const navBtnIcon = {
  width: 20,
  height: 70,
  resizeMode: 'stretch',
  opacity: 0.5,
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBtn: {
    width: navBtnWidth,
    alignItems: 'center',
    padding: 0,
    marginHorizontal: 0,
  },
  navBtnIcon,
  navBtnIconLeft: {...navBtnIcon, transform: [{rotate: '180deg'}]},
  listWrapper: {width: scrollableAreaWidth},
  wordCard: {padding: 20, width: itemWidth},
});

export default styles;
