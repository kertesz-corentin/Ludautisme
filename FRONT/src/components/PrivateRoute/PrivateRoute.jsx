import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({
    currentItems,
    currentItemsNumber
}) => {
    // determine if authorized, from context or however you're doing it
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const token = user.token;
        const role = user.role;
        // If authorized, return an outlet that will render child elements
        // If not, return element that will navigate to login page
        if (window.location.href.includes('/admin')) {
            return (token && role === "admin") ? <Outlet  currentItems= {currentItems} currentItemsNumber= {currentItemsNumber} /> : <Navigate to="/admin" />;
        }
        return token ? <Outlet currentItems= {currentItems} currentItemsNumber= {currentItemsNumber} /> : <Navigate to="/" />;
    }
    return <Navigate to="/" />;


}

export default PrivateRoute;
