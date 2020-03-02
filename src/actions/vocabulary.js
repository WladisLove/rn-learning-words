import aTypes from './actionTypes';

export const setVocabulary = ({id, ...item}) => ({
  type: aTypes.SET_VOCABULARY,
  id,
  item,
});
