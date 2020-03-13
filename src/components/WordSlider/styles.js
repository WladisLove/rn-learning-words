import {StyleSheet} from 'react-native';
import {silver, navy_dark, green_light} from '../../color';

export const navBtnWidth = 45;

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
});

export const wordCardStyles = StyleSheet.create({
  wordCardWrapper: {
    paddingHorizontal: 20,
  },
  wordCard: {
    minHeight: 200,
    padding: 20,
    backgroundColor: silver,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordCardL: {
    minHeight: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: navy_dark,
    fontWeight: '700',
  },
  textL: {flex: 0.48},
  divider: {
    width: 16,
    height: 16,
    marginVertical: 10,
    backgroundColor: green_light,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: navy_dark,
  },
});
