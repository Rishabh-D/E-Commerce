import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createOrder } from "./OrderAPI";

const initialState = {
    status: "idle",
    orders: [],
};

export const createOrderAsync = createAsyncThunk(
    "order/createOrder",
    async (item) => {
        console.log(item, "from async");
        const response = await createOrder(item);
        // alert.success("Item Added to Cart");

        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.orders.push(action.payload);
            });
    },
});

// export const { increment } = cartSlice.actions;

export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
