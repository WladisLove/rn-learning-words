import aTypes from './actionTypes';

export const setIsPortraitOrientation = isPortrait => ({
  type: aTypes.PORTRAIT_ORIENTATION_SET,
  isPortrait,
});
