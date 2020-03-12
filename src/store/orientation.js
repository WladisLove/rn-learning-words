import aTypes from '../actions/actionTypes';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case aTypes.PORTRAIT_ORIENTATION_SET:
      return {...state, isPortrait: action.isPortrait};
    default:
      return state;
  }
}
