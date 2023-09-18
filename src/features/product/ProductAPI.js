// A mock function to mimic making an async request for data
export function fetchAllProducts() {
    console.log("this will never be called");
    return new Promise(async (resolve) => {
        console.log("inside a call");
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        console.log(data);
        resolve({ data });
    });
}

export function fetchProductsByFilters({ filter, sort, pagination }) {
    // filter ={"brand":["apple", "samsung"], "key2":[val1]}
    let queryString = "";
    console.log("sort inside fetch:pagination", pagination);
    // console.log(filter, "lol", Object.keys(filter));
    for (let key in filter) {
        if (key === "_sort" || key === "_order") continue;
        // console.log("here", key);
        let query = `${key}=`;
        for (let val of filter[key]) {
            query += `${val},`;
        }
        queryString += query.slice(0, -1) + "&";
    }

    queryString += `_sort=${sort._sort}&_order=${sort._order}&`;
    queryString += `_page=${pagination._page}&_limit=${pagination._limits}`;

    console.log("queryString:", queryString);

    return new Promise(async (resolve) => {
        // console.log("inside a call");
        const response = await fetch(
            `http://localhost:8080/products?` + queryString
        );
        const data = await response.json();
        const totalItems = await response.headers.get("X-Total-Count");
        // console.log(data);
        resolve({ data: { products: data, totalItems } });
    });
}

export function fetchCategories() {
    return new Promise(async (resolve) => {
        console.log("inside fetchCategories call");
        const response = await fetch("http://localhost:8080/categories");
        const data = await response.json();
        console.log(data);
        resolve({ data });
    });
}

export function fetchBrands() {
    return new Promise(async (resolve) => {
        console.log("inside fetchBrands call");
        const response = await fetch("http://localhost:8080/brands");
        const data = await response.json();
        console.log(data);
        resolve({ data });
    });
}

export function fetchProductById(id) {
    return new Promise(async (resolve) => {
        console.log("inside a call", id);
        const response = await fetch("http://localhost:8080/products/" + id);
        const data = await response.json();
        console.log(data);
        resolve({ data });
    });
}
