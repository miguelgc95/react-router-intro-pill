import * as AppTypes from "./app-types";

function reducer(state, action) {
  switch (action.type) {
    case AppTypes.FETCH_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case AppTypes.FETCH_NEXT_PAGE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        page: state.page + 1,
        fetchingNextPage: true,
      };
    }
    case AppTypes.FETCH_NEXT_PAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        fetchingNextPage: false,
        beers: [...action.payload, ...state.beers],
      };
    }
    case AppTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        fetchingNextPage: false,
        beers: [...action.payload],
      };
    }
    case AppTypes.FETCH_ERROR: {
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

export default reducer;
