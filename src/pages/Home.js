import React, { useState, useCallback, useEffect, useContext } from "react";

import BeerCard from "../components/BeerCard";

import { controllerFunctions } from "../controllers";

import "./Home.scss";

import { BeersContext } from "../App";

function Home({ page, handleSetPage }) {
	const beers = useContext(BeersContext);
	const [thereAreMoreBeers, setThereAreMoreBeers] = useState(true);

	const checkLastBeer = useCallback(async () => {
		if (beers.length > 0) {
			let id = beers[beers.length - 1].id + 1;
			var fetchedBool = await controllerFunctions.fetchLastBeer(id);
			setThereAreMoreBeers(fetchedBool[0] ? true : false);
		}
	}, [beers]);

	useEffect(() => {
		checkLastBeer();
	}, [beers, checkLastBeer]);

	return (
		<div>
			<main className="container mt-4">
				<section className="row mb-2">
					<div className="col">
						<div className="d-flex align-items-center">
							<h1 className="h3 m-0">Punk API</h1>
						</div>
						<div>
							<button
								disabled={page === 1 ? true : false}
								onClick={() => handleSetPage(page - 1)}
							>
								prev
							</button>
							<span className="margin">{page}</span>
							<button
								disabled={!thereAreMoreBeers}
								onClick={() => handleSetPage(page + 1)}
							>
								next
							</button>
						</div>
					</div>
					{beers.map((beer) => (
						<BeerCard theBeer={beer} />
					))}
				</section>
			</main>
		</div>
	);
}

export default Home;
