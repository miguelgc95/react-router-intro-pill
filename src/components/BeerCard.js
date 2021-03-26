import React from "react";
import { Link } from "react-router-dom";

import BeerMeta from "./BeerMeta";

function BeerCard({ theBeer }) {
  return (
    <div key={theBeer.id} className="col col-4">
      <div className="border p-3 mb-3">
        <Link to={`/beers/${theBeer.id}`}>
          <h4 className="h6">{theBeer.name}</h4>
        </Link>
        <p className="m-0">{theBeer.tagline}</p>
        <hr />
        <BeerMeta ibu={theBeer.ibu} abv={theBeer.abv} ebc={theBeer.ebc} />
      </div>
    </div>
  );
}

export default BeerCard;
