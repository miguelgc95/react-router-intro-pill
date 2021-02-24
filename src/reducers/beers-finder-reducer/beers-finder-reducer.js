import * as BeersFinderTypes from "./beers-finder-types";

function beersFinderReducer(state, action) {
  switch (action.type) {
    case BeersFinderTypes.FETCH_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case BeersFinderTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        beers: action.payload,
      };
    }
    case BeersFinderTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default beersFinderReducer;
