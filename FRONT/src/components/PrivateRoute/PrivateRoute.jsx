import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // determine if authorized, from context or however you're doing it
    const {token,role} = JSON.parse(localStorage.getItem('user'));
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    if (window.location.href.includes('/admin')) {
        return (token && role === "admin") ? <Outlet /> : <Navigate to="/admin" />;
    }
    return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
