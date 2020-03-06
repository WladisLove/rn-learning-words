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

export const changeVocabularyName = (id, newId, name) => ({
  type: aTypes.CHANGE_NAME_VOCABULARY,
  id,
  newId,
  name,
});

export const setWord = (item, vocabularyId) => ({
  type: aTypes.SET_WORD,
  vocabularyId,
  id: item.id,
  item,
});

export const deleteWord = (id, vocabularyId) => ({
  type: aTypes.DELETE_WORD,
  vocabularyId,
  id,
});
