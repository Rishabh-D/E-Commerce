import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import ProductList from "./features/product/ProductList";
import Navbar from "./features/navbar/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <Home></Home>
        </div>
    );
}

export default App;
