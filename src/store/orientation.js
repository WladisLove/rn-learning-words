import aTypes from '../actions/actionTypes';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case aTypes.ORIENTATION_INFO_SET:
      return {
        ...state,
        isLandscape:
          action.isLandscape === undefined
            ? state.isLandscape
            : action.isLandscape,
        screenW: action.screenW || state.screenW,
      };
    default:
      return state;
  }
}
