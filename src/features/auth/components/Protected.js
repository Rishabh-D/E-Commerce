// this component is indended to protect its children components from unauthorized access

import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
    const user = useSelector(selectLoggedInUser);
    if (!user) {
        return <Navigate to="/login"></Navigate>;
    }
    console.log("user present");
    return children;
}

export default Protected;
