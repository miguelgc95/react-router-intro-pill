import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";

import AppReducer from "../reducers/app-reducer/app-reducer.js";
import AppInitialState from "../reducers/app-reducer/app-initial-state.js";
import * as AppTypes from "../reducers/app-reducer/app-types.js";

function useBeersData() {
  const [
    { beers, page, error, loading, fetchingNextPage },
    dispatch,
  ] = useReducer(AppReducer, AppInitialState);

  const nextPage = useCallback(() => {
    dispatch({
      type: AppTypes.FETCH_NEXT_PAGE_REQUEST,
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchBeers() {
      dispatch({
        type: AppTypes.FETCH_REQUEST,
      });

      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=9`
        );

        if (isMounted) {
          if (fetchingNextPage) {
            return dispatch({
              type: AppTypes.FETCH_NEXT_PAGE_SUCCESS,
              payload: response.data,
            });
          }

          dispatch({
            type: AppTypes.FETCH_SUCCESS,
            payload: response.data,
          });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({
            type: AppTypes.FETCH_ERROR,
            payload: error.message,
          });
        }
      }
    }

    if (fetchingNextPage || !beers.length) {
      fetchBeers();
    }

    return () => {
      isMounted = false;
    };
  }, [beers, page, fetchingNextPage]);

  return {
    beers,
    error,
    loading,
    nextPage,
  };
}

export default useBeersData;
