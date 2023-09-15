import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters } from "./ProductAPI";
const initialState = {
    products: [],
    status: "idle",
};

// The function below is called a thunk and allows us to perform async logic.Thunks are
// typically used to make async requests.

/*
         *In order to fetch the products data and store it in the state, 
         you need to dispatch the fetchAllProductsAsync function in ProductList.js or any file where you want the data to get populated first. 
         This function makes an async call to fetch the products data 
         and dispatches actions to update the state with the fetched data. 
         By calling this function in the useEffect hook of your component, 
         the data will be fetched and updated in the state once the component mounts.
*/
export const fetchAllProductsAsync = createAsyncThunk(
    "product/fetchAllProducts",
    async () => {
        console.log("fetchAllProductsAsync dbcjsdbjsdbjsb");
        const response = await fetchAllProducts();
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
    "product/fetchProductsByFilters",
    async (filter, sort) => {
        // console.log("fetchProductsByFiltersAsync");
        const response = await fetchProductsByFilters(filter, sort);
        // console.log(response.data);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload;
            });
    },
});

export const { increment } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
