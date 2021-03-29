import React, { useState, useCallback, useEffect, useContext } from "react";

import BeerCard from "../components/BeerCard";

import { controllerFunctions } from "../controllers";

import "./Home.scss";

import { GlobalContext } from "../App";

import { ACTIONS } from '../App'

function Home({ dispatch }) {
	const state = useContext(GlobalContext);
	const [thereAreMoreBeers, setThereAreMoreBeers] = useState(true);

	const checkLastBeer = useCallback(async () => {
		if (state.beers.length > 0) {
			let id = state.beers[state.beers.length - 1].id + 1;
			var fetchedBool = await controllerFunctions.fetchLastBeer(id);
			setThereAreMoreBeers(fetchedBool[0] ? true : false);
		}
	}, [state.beers]);

	useEffect(() => {
		checkLastBeer();
	}, [state.beers, checkLastBeer]);

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
								disabled={state.page === 1 ? true : false}
								onClick={() => dispatch({type: ACTIONS.DECREMENT_PAGE})}
							>
								prev
							</button>
							<span className="margin">{state.page}</span>
							<button
								disabled={!thereAreMoreBeers}
								onClick={() => dispatch({type: ACTIONS.INCREMENT_PAGE})}
							>
								next
							</button>
						</div>
					</div>
					{state.beers.map((beer) => (
						<BeerCard key={beer.id} theBeer={beer} />
					))}
				</section>
			</main>
		</div>
	);
}

export default Home;
