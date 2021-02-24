import React from "react";
import { Link } from "react-router-dom";

import BeerMeta from "./BeerMeta";

function BeerCard({ beer }) {
  return (
    <div key={beer.id} className="col col-4">
      <div className="border p-3 mb-3">
        <Link to={`/beers/${beer.id}`}>
          <h4 className="h6">{beer.name}</h4>
        </Link>
        <p className="m-0">{beer.tagline}</p>
        <hr />
        <BeerMeta ibu={beer.ibu} abv={beer.abv} ebc={beer.ebc} />
      </div>
    </div>
  );
}

export default BeerCard;
