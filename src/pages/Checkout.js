import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Cart from "../features/cart/Cart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { selectLoggedInUser } from "../features/auth/AuthSlice";

import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import {
    createOrderAsync,
    selectCurrentOrder,
    selectCurrentOrderStatus,
} from "../features/order/OrderSlice";
import { selectItems } from "../features/cart/CartSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // since we can not use <Navigate component inside a function or outside return, we can use useNavigate

export default function Checkout() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    // const user = useSelector(selectLoggedInUser);
    const user = useSelector(selectUserInfo);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const currentOrder = useSelector(selectCurrentOrder);
    const navigate = useNavigate();
    //same as Cart
    const items = useSelector(selectItems);

    const totalAmount = items.reduce(
        (amount, item) => item.price * item.quantity + amount,
        0
    );
    const totalItems = items.reduce((total, item) => item.quantity + total, 0);
    //same as cart end

    const handleAddress = (e) => {
        console.log(e.target.value);
        setSelectedAddress(user.addresses[e.target.value]);
    };
    const handlePayment = (e) => {
        console.log(e.target.value);
        setPaymentMethod(e.target.value);
    };

    const handleOrder = (e) => {
        console.log("handler from checkout::cart");
        // console.log(e);
        const order = {
            items: items,
            totalAmount,
            totalItems,
            user,
            paymentMethod,
            selectedAddress,
            status: "pending", // can be changed by admin
        };
        dispatch(createOrderAsync(order));

        //TODO
        //1. redirect to order success page
        //2. clear cart after order
        //3. on server change the stock number of items
    };
    useEffect(() => {
        console.log("useEffect,", "checkout page");
        if (currentOrder) {
            console.log("order has value", currentOrder);
            navigate("/order-success/" + currentOrder.id, { replace: true });
        }
    }, [dispatch, currentOrder]);

    return (
        <>
            {!items.length && <Navigate to="/" replace={true}></Navigate>}
            {/* {currentOrder && (
                <Navigate
                    to={`/order-success/${currentOrder.id}`}
                    replace={true}
                ></Navigate>
            )} */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <form
                            className="bg-white px-5"
                            noValidate
                            onSubmit={handleSubmit((data) => {
                                console.log("address", data);
                                dispatch(
                                    updateUserAsync({
                                        ...user,
                                        addresses: [...user.addresses, data],
                                    })
                                );
                            })}
                            method="POST"
                        >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base py-12 text-xl font-semibold leading-7 text-gray-900">
                                        Personal Information
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Use a permanent address where you can
                                        receive mail.
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    {...register("name", {
                                                        required:
                                                            "name is required",
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    {...register("email", {
                                                        required:
                                                            "email is required",
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    {...register("phone", {
                                                        required:
                                                            "phone is required",
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                ></input>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label
                                                htmlFor="street"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="street"
                                                    id="street"
                                                    {...register("street", {
                                                        required:
                                                            "street is required",
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    {...register("city", {
                                                        required:
                                                            "city is required",
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="state"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    {...register("state", {
                                                        required:
                                                            "state is required",
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="pinCode"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="pinCode"
                                                    id="pinCode"
                                                    {...register("pinCode", {
                                                        required:
                                                            "pinCode is required",
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        type="button"
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add address
                                    </button>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Addresses
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from existing address
                                    </p>

                                    {/* added stacked list from tailwind template below for address */}
                                    <ul role="list">
                                        {user.addresses.map(
                                            (address, index) => (
                                                <li
                                                    key={index}
                                                    className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray"
                                                >
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <input
                                                            name="address"
                                                            type="radio"
                                                            onChange={
                                                                handleAddress
                                                            }
                                                            value={index}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                                {address.name}
                                                            </p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                {address.street}
                                                            </p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                {
                                                                    address.pinCode
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm leading-6 text-gray-900">
                                                            {address.phone}
                                                        </p>
                                                        <p className="text-sm leading-6 text-gray-900">
                                                            {address.city}
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                Payment Methods
                                            </legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Choose how you wish to pay.
                                            </p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        onChange={handlePayment}
                                                        name="payments"
                                                        type="radio"
                                                        value="card"
                                                        checked={
                                                            paymentMethod ===
                                                            "card"
                                                        }
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label
                                                        htmlFor="card"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Card
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        onChange={handlePayment}
                                                        name="payments"
                                                        type="radio"
                                                        value="cash"
                                                        checked={
                                                            paymentMethod ===
                                                            "cash"
                                                        }
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label
                                                        htmlFor="cash"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Cash
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2">
                        <Cart
                            pageName="checkout"
                            btnText="Order Now"
                            link={"no-link"}
                            handler={handleOrder}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
