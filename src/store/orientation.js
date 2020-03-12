import aTypes from '../actions/actionTypes';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case aTypes.LANDSCAPE_ORIENTATION_SET:
      return {...state, isLandscape: action.isLandscape};
    default:
      return state;
  }
}
