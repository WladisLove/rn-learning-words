import aTypes from './actionTypes';

export const setVocabulary = ({id, ...item}) => ({
  type: aTypes.VOCABULARY_SET,
  id,
  item,
});

export const deleteVocabulary = id => ({
  type: aTypes.VOCABULARY_DELETE,
  id,
});

export const changeVocabularyName = (id, newId, name) => ({
  type: aTypes.VOCABULARY_CHANGE_NAME,
  id,
  newId,
  name,
});

export const setWord = (item, vocabularyId) => ({
  type: aTypes.WORD_SET,
  vocabularyId,
  id: item.id,
  item,
});

export const deleteWord = (id, vocabularyId) => ({
  type: aTypes.WORD_DELETE,
  vocabularyId,
  id,
});

export const moveWord = (id, fromVocId, toVocId) => ({
  type: aTypes.WORD_MOVE,
  fromVocId,
  toVocId,
  id,
});
