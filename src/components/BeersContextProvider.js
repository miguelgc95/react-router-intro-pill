import React, { useMemo } from "react";

import useBeersData from "../hooks/useBeersData";
import BeersContext from "../context/BeersContext";

function BeersContextProvider({ children }) {
  const { beers, error, loading, nextPage } = useBeersData();

  const data = useMemo(
    () => ({
      beers,
      error,
      loading,
      nextPage,
    }),
    [beers, error, loading, nextPage]
  );

  return <BeersContext.Provider value={data}>{children}</BeersContext.Provider>;
}

export default BeersContextProvider;
