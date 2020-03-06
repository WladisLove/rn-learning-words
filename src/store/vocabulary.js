import aTypes from '../actions/actionTypes';

const initialState = {
  vocabularies: {},
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
      const newWords = {...state.vocabularies[vocId].words};
      delete newWords[id];
      return {
        ...state,
        vocabularies: {
          ...state.vocabularies,
          [vocId]: {...state.vocabularies[vocId], words: newWords},
        },
      };
    }
    default:
      return state;
  }
}
