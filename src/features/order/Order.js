import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";
import { selectOrders } from "./OrderSlice";

export default function Order({ pageName, btnText, link, handler = () => {} }) {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    console.log("from orders page", orders);

    return (
        <>
            <div>
                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                            Orders
                        </h1>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6"></div>
                </div>
            </div>
        </>
    );
}
