import React, { useCallback, useEffect, useState } from "react";
import { controllerFunctions } from "../controllers";

import BeerCard from "../components/BeerCard";

function Find() {
	const [inputDate, setInputDate] = useState("01/2000");
	const [brewedDate, setBrewedDate] = useState(inputDate);
	const [beersBrewedAfterDate, setBeersBrewedAfterDate] = useState([]);

	const fetchCallback = useCallback(async (date) => {
		const brewedBeers = await controllerFunctions.fetchBrewedBeers(date);
		setBeersBrewedAfterDate(brewedBeers);
	}, []);

	useEffect(() => {
		fetchCallback(brewedDate);
	}, [brewedDate, fetchCallback]);

	return (
		<div>
			<main className="container mt-4">
				<section className="row mb-2">
					<div className="col">
						<div className="d-flex align-items-center">
							<h1 className="h3 m-0">Punk API Finder</h1>
						</div>
						<input
							onChange={(e) => setInputDate(e.target.value)}
							type="text"
							placeholder={`date format: ${inputDate}`}
						></input>
						<button onClick={() => setBrewedDate(inputDate)}>
							fetch beers brewed before {inputDate}
						</button>
					</div>
					{beersBrewedAfterDate.map((beer) => (
						<BeerCard theBeer={beer} />
					))}
				</section>
			</main>
		</div>
	);
}

export default Find;
