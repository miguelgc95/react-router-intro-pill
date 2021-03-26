import React from "react";
import BeerMeta from "./BeerMeta";

function BeerAdditionalInfo({ theBeer }) {
	return (
		<div key={theBeer.id} className="p-2 d-flex align-items-center justify-content-around border">
			<div className="border p-3 d-flex flex-column align-items-center">
				<h2 className="h2 ">{theBeer.name}</h2>
				<p className="m-0">{theBeer.tagline}</p>
				<hr />
				<BeerMeta
					ibu={theBeer.ibu}
					abv={theBeer.abv}
					ebc={theBeer.ebc}
				/>
			</div>
			<img src={theBeer.image_url} alt={theBeer.name}></img>
		</div>
	);
}

export default BeerAdditionalInfo;
