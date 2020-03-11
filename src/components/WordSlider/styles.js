import {StyleSheet, Dimensions} from 'react-native';
import {silver, navy_dark} from '../../color';

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

export const sliderStyles = StyleSheet.create({
  mainContainer: {
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
});

export const wordCardStyles = StyleSheet.create({
  wordCardWrapper: {
    paddingHorizontal: 20,
    width: itemWidth,
  },
  wordCard: {
    minHeight: 200,
    padding: 20,
    backgroundColor: silver,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: navy_dark,
    fontWeight: '700',
  },
  divider: {fontSize: 16, marginVertical: 10},
});
