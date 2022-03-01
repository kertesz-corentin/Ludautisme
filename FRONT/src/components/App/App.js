

import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HomeUser from '../User/UserMyAccount/UserMyAccount';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import UserMyAccount from '../User/UserMyAccount/UserMyAccount';
import UserBookings from '../User/UserBookings/UserBookings';




function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path = "/" element = {<HomePage />}></Route>
            {/* <Route path = "/about" element = {<About />}></Route> */}
            {/* <Route path = "/infos" element = {<Infos />}></Route> */}
            {/* <Route path = "/usefulllinks" element = {<UsefullLinks />}></Route> */}
            {/* <Route path = "/shop" element = {<Shop />}></Route> */}
            {/* <Route path = "/admin/categorie" element = {<AdminCategory />}></Route> */}
            {/* <Route path = "/admin" element = {<Admin />}></Route> */}
            {/* <Route path = "/admin/users" element = {<AdminUsers/>}></Route> */}
            {/* <Route path = "/admin/users/:id" element = {<AdminUser/>}></Route> */}
            {/* <Route path = "/admin/references" element = {<AdminReferences />}></Route> */}
            {/* <Route path = "/admin/references/:id" element = {<AdminReference />}></Route> */}
            {/* <Route path = "/admin/references/:id/articles" element = {<AdminArticles />}></Route> */}
            {/* <Route path = "/admin/categories" element = {<AdminCategories />}></Route> */}
            {/* <Route path = "/admin/bookings" element = {<AdminBookings />}></Route> */}
            {/* <Route path = "/admin/logout" element = {<AdminLogout />}></Route> */}
            {/* <Route path = "/admin/login" element = {<AdminLogin />}></Route> */}
                <Route path = "/user/account" element = {<UserMyAccount />}></Route>
                <Route path = "/user/bookings" element = {<UserBookings/>}></Route>
            {/* <Route path = "/user/booking/active" element = {<UserBookingActive />}></Route> */}
            {/* <Route path = "/user/articles" element = {<MaterialLibrary />}></Route> */}
            {/* <Route path = "*" element = {<Error />}></Route>  */}
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
