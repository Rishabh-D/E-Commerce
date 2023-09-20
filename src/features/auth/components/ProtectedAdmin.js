// this component is indended to protect its children components from unauthorized access

import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
    const user = useSelector(selectLoggedInUser);
    console.log("user,user", user);
    if (!user) {
        return <Navigate to="/login"></Navigate>;
    }
    if (user && user.role !== "admin") {
        return <Navigate to="/"></Navigate>;
    }
    // if (user && user.role == "admin") {
    //     console.log(user);
    //     // return <Navigate to="/admin"></Navigate>;
    // }
    console.log("admin present");
    return children;
}

export default ProtectedAdmin;
