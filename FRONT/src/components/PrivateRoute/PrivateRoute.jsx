import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // determine if authorized, from context or however you're doing it
    const auth = (localStorage.getItem('token')) ? localStorage.getItem('token') : null;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    if (window.location.href.includes('/admin')) {
        return auth ? <Outlet /> : <Navigate to="/admin" />;
    }
    return auth ? <Outlet /> : <Navigate to="/" />;


}

export default PrivateRoute;
