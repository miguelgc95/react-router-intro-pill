import { createContext } from "react";

const BeersContext = createContext({
  beers: [],
  error: null,
  loading: false,
  nextPage: () => {},
});

export default BeersContext;
