import aTypes from './actionTypes';

export const setVocabulary = ({id, ...item}) => ({
  type: aTypes.SET_VOCABULARY,
  id,
  item,
});

export const deleteVocabulary = id => ({
  type: aTypes.DELETE_VOCABULARY,
  id,
});

export const setWord = (item, vocabularyId) => ({
  type: aTypes.SET_WORD,
  vocabularyId,
  id: item.id,
  item,
});
