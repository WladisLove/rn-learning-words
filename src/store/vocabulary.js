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
    case aTypes.DELETE_VOCABULARY:
      const newVocabularies = {...state.vocabularies};
      delete newVocabularies[action.id];
      return {
        ...state,
        vocabularies: {...newVocabularies},
      };
    default:
      return state;
  }
}
