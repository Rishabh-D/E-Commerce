import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../features/cart/CartSlice";
import { resetOrder } from "../features/order/OrderSlice";
import { selectLoggedInUser } from "../features/auth/AuthSlice";

function OrderSuccessPage() {
    const { id } = useParams(); // order id
    // console.log("order", order, !order);
    console.log("order success page", id);
    const dispatch = useDispatch();
    const LoggedInUser = useSelector(selectLoggedInUser);
    console.log("logged in user id", LoggedInUser);

    useEffect(() => {
        console.log("useeffect insode order-success page");
        //reset cart
        dispatch(resetCartAsync(LoggedInUser.id));

        //reset the currentorder (as it is local to browser use simple reducer and not thunk)
        dispatch(resetOrder());
    }, [dispatch]);
    return (
        <>
            {!id && <Navigate to="/" replace={true}></Navigate>}
            {/* Navigate doesnt automatically navigates to the intended page, it runs this page and triggers re-run and then navigates *
            
                The `<Navigate>` component from `react-router-dom` is used to programmatically navigate to different routes. If it's not working as expected, it might be due to the way React handles rendering and updates.

                In your code, `{!order && <Navigate to="/" replace={true}></Navigate>}`, the `<Navigate>` component is rendered conditionally based on the `order` state. When `order` is `undefined` or a falsy value, the `<Navigate>` component will be rendered, triggering a navigation.

                However, React may not immediately re-render the component when state changes. It may batch multiple state updates into a single update for performance reasons. This means that the component might not re-render—and thus not navigate—immediately after `order` changes.

                If you want to ensure immediate navigation, you might want to use a side effect (with the `useEffect` hook) that triggers when `order` changes:

                ```jsx
                import { useEffect } from 'react';
                import { useNavigate } from 'react-router-dom';

                // Inside your component...
                const navigate = useNavigate();

                useEffect(() => {
                if (!order) {
                    navigate('/', { replace: true });
                }
                }, [order]); // This effect runs whenever `order` changes
                ```

                This code will navigate to `'/'` whenever `order` is falsy. The navigation should occur immediately after `order` changes, without waiting for the next render cycle.
            
    */}
            <main className="flex justify-center items-center min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-full h-screen">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">
                        Order Successfully Placed
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Order Number #{id}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        {"You can check your orders in My Account > My Orders"}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default OrderSuccessPage;
