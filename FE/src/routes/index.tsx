import React from "react";
// import '../styles/style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from "../pages/(dashboard)/product/page";
import Checkout from "../pages/(dashboard)/product/checkout";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
