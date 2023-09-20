import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(() => {
        if (user) dispatch(signOutAsync(user.id));
    });

    // useEffect runs after render, so we need to delau the navigate component
    return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
