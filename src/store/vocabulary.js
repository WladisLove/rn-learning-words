import aTypes from '../actions/actionTypes';

const initialState = {
  vocabularies: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case aTypes.SET_VOCABULARY:
      return {
        ...state,
        vocabularies: [...state.vocabularies, action.item],
      };
    default:
      return state;
  }
}