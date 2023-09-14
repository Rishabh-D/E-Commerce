// A mock function to mimic making an async request for data
export function fetchAllProducts() {
	return new Promise(async (resolve) => {
		console.log("inside a call");
		const response = await fetch("http://localhost:8080/products");
		const data = await response.json();
		console.log(data);
		resolve({ data });
	});
}

export function fetchProductsByFilters(filter) {
	// filter ={"brand":["apple", "samsung"], "key2":[val1]}
	let queryString = "";
	console.log(filter, "lol", Object.keys(filter));
	for (let key in filter) {
		if (key === "_sort" || key === "_order") continue;
		console.log("here", key);
		let query = `${key}=`;
		for (let val of filter[key]) {
			query += `${val},`;
		}
		queryString += query.slice(0, -1) + "&";
	}
	queryString = queryString.slice(0, -1);
	if (filter._sort) {
		if (filter._order) {
			queryString += `&_sort=${filter._sort}&_order=${filter._order}`;
		} else {
			queryString += `&_sort=${filter._sort}`;
		}
	} else {
		if (filter._order) {
			queryString += `&_order${filter._order}`;
		}
	}

	console.log("queryString", queryString);

	return new Promise(async (resolve) => {
		// console.log("inside a call");
		const response = await fetch(
			`http://localhost:8080/products?` + queryString
		);
		const data = await response.json();
		// console.log(data);
		resolve({ data });
	});
}
