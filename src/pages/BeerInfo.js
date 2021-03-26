import React from "react";
import { useParams } from "react-router-dom";
import BeerAdditionalInfo from "../components/BeerAdditionalInfo";

function BeerInfo({ beers }) {
	const { beerId } = useParams();
	const myBeer = beers.find((beer) => beer.id === parseInt(beerId));
	return (
		<div>
			<main className="container mt-4">
				<section className="row mb-2">
					<div className="col">
						<div className="d-flex align-items-center">
							<h1 className="h3 m-0">Punk API</h1>
						</div>
						<BeerAdditionalInfo theBeer={myBeer} />
					</div>
				</section>
			</main>
		</div>
	);
}

export default BeerInfo;
