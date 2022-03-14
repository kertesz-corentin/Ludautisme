import React from 'react';
import Home from '../Home/Home';
import HomePage from '../HomePage/HomePage';
import {Routes, Route} from 'react-router-dom';
import UserMyAccount from '../User/UserMyAccount/UserMyAccount';
import UserBookings from '../User/UserBookings/UserBookings';
import Admin from '../Admin/Admin';
import AdminPage from '../Admin/AdminPage/AdminPage';
import AdminHome from '../Admin/AdminHome/AdminHome';
import AdminUsers from '../Admin/AdminUsers/AdminUsers';
import AdminBookings from '../Admin/AdminBookings/AdminBookings';
import AdminReferences from '../Admin/AdminReferences/AdminReferences';
import UserBookingActive from '../User/UserBookingActive/UserBookingActive';
import UserBookingsHistory from '../User/UserBookingsHistory/UserBookingsHistory';
import About from '../About/About';
import Infos from '../Infos/Infos';
import MaterialLibrary from '../MaterialLibrary/MaterialLibrary';
import UsefullLinks from '../UsefullLinks/UsefullLinks';
import './App.scss';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Error from '../Error/Error';
import ResetPwd from '../ResetPwd/ResetPwd';
import { useState } from 'react';

export const FunctionContext= React.createContext();


function App() {
    let [itemsToCart, setItemsToCart] = useState([]);
    const addItemsToCart = (newCart) => {
        const newQuantity = setItemsToCart(itemsToCart => [...itemsToCart, newCart]);
        return newQuantity;
    };
     console.log(`Nombre de mes bookings en cours`, itemsToCart.length)
    // Client Application
    return (
    <div className="App">
        <Routes>
            <Route path = "/" element = {<Home children={<HomePage />} />}></Route>
            <Route path = "/about" element = {<Home children={<About />} />}></Route>
            <Route path = "/infos" element = {<Home children={<Infos />} />}></Route>
            <Route path = "/usefulllinks" element = {<Home children={<UsefullLinks />} />}></Route>
            <Route path = "/materiallibrary" element = {<Home currentItemsNumber= {itemsToCart.length} children={<FunctionContext.Provider value ={addItemsToCart}><MaterialLibrary /></FunctionContext.Provider>} />}></Route>


            <Route path = "/admin" element = {<Admin />}></Route>
            <Route path = "/admin/home" element = {<PrivateRoute/>}>
                <Route path = "/admin/home" element = {<AdminPage><AdminHome /></AdminPage>}></Route>
            </Route>
            <Route path = "/admin/users" element = {<PrivateRoute/>}>
                <Route path = "/admin/users" element = {<AdminPage><AdminUsers /></AdminPage>}></Route>
            </Route>
            <Route path = "/admin/references" element = {<PrivateRoute/>}>
                <Route path = "/admin/references" element = {<AdminPage><AdminReferences /></AdminPage>}></Route>
            </Route>
            <Route path = "/admin/bookings" element = {<PrivateRoute/>}>
                <Route path = "/admin/bookings" element = {<AdminPage><AdminBookings /></AdminPage>}></Route>
            </Route>
            {/* <Route path = "/admin/categorie" element = {<AdminCategory />}></Route> */}
            {/* <Route path = "/admin/users/:id" element = {<AdminUser/>}></Route> */}
            {/* <Route path = "/admin/references/:id" element = {<AdminReference />}></Route> */}
            {/* <Route path = "/admin/references/:id/articles" element = {<AdminArticles />}></Route> */}
            {/* <Route path = "/admin/categories" element = {<AdminCategories />}></Route> */}
            {/* <Route path = "/admin/logout" element = {<AdminLogout />}></Route> */}





            <Route path = "/user/account" element = {<PrivateRoute/>}>
                <Route path = "/user/account" element = {<Home children={<UserMyAccount />} />}></Route>
            </Route>
            {/* <Route path = "/shop" element = {<Shop />}></Route> */}
            <Route path = "/user/account" element = {<PrivateRoute/>}>
                <Route path = "/user/account" element = {<UserMyAccount />}></Route>ItemsToShop
            </Route>
            <Route path = "/user/bookings" element = {<PrivateRoute/>}>
                <Route path = "/user/bookings" element = {<Home children= {<UserBookings/>}/>}></Route>
            </Route>
            <Route path = "/user/booking/active" element = {<PrivateRoute/>}>
                <Route path = "/user/booking/active" element = {<UserBookingActive />}></Route>
            </Route>
            <Route path = "/user/bookings/history" element = {<PrivateRoute/>}>
                <Route path = "/user/bookings/history" element = {<UserBookingsHistory />}></Route>
            </Route>
            <Route path = "/user/articles" element = {<Home children={<FunctionContext.Provider value ={addItemsToCart}><MaterialLibrary /></FunctionContext.Provider>} />}></Route>
            <Route path = "/resetpassword/:token" element ={<ResetPwd />}></Route>
            <Route path = "*" element = {<Error />}></Route>
        </Routes>
    </div>
    );
}

export default App;
