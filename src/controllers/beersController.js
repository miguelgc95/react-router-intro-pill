function fetchOnePageBeers(page) {
	const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=25`;
	return fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
}

function fetchLastBeer(id) {
	const url = `https://api.punkapi.com/v2/beers/${id}`;
	return fetch(url)
	.then((response) => {
		return response.json();
	}).catch(e => e.preventDefault())
}

export default fetchOnePageBeers;
export { fetchLastBeer };
