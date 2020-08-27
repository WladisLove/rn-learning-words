import aTypes from './actionTypes';

export const setOrientationInfo = ({isLandscape, screenW, screenH}) => ({
  type: aTypes.ORIENTATION_INFO_SET,
  isLandscape,
  screenW,
  screenH,
});
