// A mock function to mimic making an async request for data
export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        // console.log("inside a call");
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        // console.log(data);
        resolve({ data });
    });
}

export function fetchProductsByFilters(filter) {
    // filter ={"brand":["apple", "samsung"], "key2":[val1]}
    let queryString = "";
    console.log(filter);
    for (let key in filter) {
        let string = `${key}=`;
        for (let val in filter[key]) {
            string += `${val}},`;
        }

        queryString += "&";
    }

    console.log(queryString);

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
