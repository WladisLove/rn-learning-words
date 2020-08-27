import aTypes from '../actions/actionTypes';
import {DEFAULT_WORD_LVL} from '../constants';

const initialState = {
  vocabularies: {},
};

const deleteWordFromVoc = (state, vocId, wordId) => {
  const newWords = {...state.vocabularies[vocId].words};
  const deletedWord = newWords[wordId];
  delete newWords[wordId];
  return [newWords, deletedWord];
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case aTypes.VOCABULARY_SET:
      return {
        ...state,
        vocabularies: {
          ...state.vocabularies,
          [action.id]: {...state.vocabularies[action.id], ...action.item},
        },
      };
    case aTypes.VOCABULARY_CHANGE_NAME: {
      const newVocabularies = {
        ...state.vocabularies,
        [action.newId]: {...state.vocabularies[action.id], name: action.name},
      };
      delete newVocabularies[action.id];

      return {
        ...state,
        vocabularies: newVocabularies,
      };
    }
    case aTypes.VOCABULARY_DELETE: {
      const newVocabularies = {...state.vocabularies};
      delete newVocabularies[action.id];
      return {...state, vocabularies: {...newVocabularies}};
    }
    case aTypes.WORD_SET:
      return {
        ...state,
        vocabularies: {
          ...state.vocabularies,
          [action.vocabularyId]: {
            ...state.vocabularies[action.vocabularyId],
            words: {
              ...(state.vocabularies[action.vocabularyId].words || {}),
              [action.id]: action.item,
            },
          },
        },
      };
    case aTypes.WORD_DELETE: {
      const {vocabularyId: vocId, id} = action;
      const [newWords] = deleteWordFromVoc(state, vocId, id);
      return {
        ...state,
        vocabularies: {
          ...state.vocabularies,
          [vocId]: {...state.vocabularies[vocId], words: newWords},
        },
      };
    }
    case aTypes.WORD_MOVE: {
      const {fromVocId, toVocId, id} = action;
      const [newWords, word] = deleteWordFromVoc(state, fromVocId, id);
      word.lvl = DEFAULT_WORD_LVL;
      return {
        ...state,
        vocabularies: {
          ...state.vocabularies,
          [fromVocId]: {...state.vocabularies[fromVocId], words: newWords},
          [toVocId]: {
            ...state.vocabularies[toVocId],
            words: {...state.vocabularies[toVocId].words, [id]: word},
          },
        },
      };
    }
    default:
      return state;
  }
}
