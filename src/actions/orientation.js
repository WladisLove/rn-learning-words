import aTypes from './actionTypes';

export const setOrientationInfo = ({isLandscape, screenW}) => ({
  type: aTypes.ORIENTATION_INFO_SET,
  isLandscape,
  screenW,
});
