import aTypes from './actionTypes';

export const setIsLandscapeOrientation = isLandscape => ({
  type: aTypes.LANDSCAPE_ORIENTATION_SET,
  isLandscape,
});
