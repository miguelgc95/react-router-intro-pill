import { useReducer, useEffect } from "react";
import axios from "axios";

import { buildSearchParams } from "../utils/utils";

import BeersFinderReducer from "../reducers/beers-finder-reducer/beers-finder-reducer.js";
import BeersFinderInitialState from "../reducers/beers-finder-reducer/beers-finder-initial-state.js";
import * as BeersFinderTypes from "../reducers/beers-finder-reducer/beers-finder-types.js";

function useBeersFinder(search) {
  const [{ beers, error, loading }, dispatch] = useReducer(
    BeersFinderReducer,
    BeersFinderInitialState
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchBeers() {
      dispatch({
        type: BeersFinderTypes.FETCH_REQUEST,
      });

      try {
        const searchParams = buildSearchParams(search);

        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?${searchParams}`
        );

        if (isMounted) {
          dispatch({
            type: BeersFinderTypes.FETCH_SUCCESS,
            payload: response.data,
          });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({
            type: BeersFinderTypes.FETCH_ERROR,
            payload: error.message,
          });
        }
      }
    }

    if (!beers.length) {
      fetchBeers();
    }

    return () => {
      isMounted = false;
    };
  }, [beers, search]);

  return {
    beers,
    error,
    loading,
  };
}

export default useBeersFinder;
