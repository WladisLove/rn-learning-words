import aTypes from '../actions/actionTypes';

const initialState = {
  vocabularies: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case aTypes.SET_VOCABULARY:
      return {
        ...state,
        vocabularies: {
          ...state.vocabularies,
          [action.id]: {...state.vocabularies[action.id], ...action.item},
        },
      };
    case aTypes.CHANGE_NAME_VOCABULARY: {
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
    case aTypes.DELETE_VOCABULARY:
      const newVocabularies = {...state.vocabularies};
      delete newVocabularies[action.id];
      return {
        ...state,
        vocabularies: {...newVocabularies},
      };
    case aTypes.SET_WORD:
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
    case aTypes.DELETE_WORD:
      const newWords = {...state.vocabularies[action.vocabularyId].words};
      delete newWords[action.id];
      return {
        ...state,
        vocabularies: {
          ...state.vocabularies,
          [action.vocabularyId]: {
            ...state.vocabularies[action.vocabularyId],
            words: {...newWords},
          },
        },
      };
    default:
      return state;
  }
}
