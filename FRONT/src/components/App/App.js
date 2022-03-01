
// import Header from '../../components/Header/Header';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
// import HomePage from '../HomePage/HomePage';
import AdminPage from '../Admin/AdminPage/AdminPage';
import AdminHome from '../Admin/AdminHome/AdminHome';
import AdminUsers from '../Admin/AdminUsers/AdminUsers';
import AdminLogin from '../Admin/AdminLogin/AdminLogin';
import AdminBookings from '../Admin/AdminBookings/AdminBookings';
import AdminReferences from '../Admin/AdminReferences/AdminReferences';

import Admin from '../Admin/Admin';


function App() {
  return (
    <div className="App">

        {/* <Header/> */}
        <Routes>
            {/* <Route path = "/" element = {<HomePage />}></Route> */}
            {/* <Route path = "/about" element = {<About />}></Route> */}
            {/* <Route path = "/infos" element = {<Infos />}></Route> */}
            {/* <Route path = "/usefulllinks" element = {<UsefullLinks />}></Route> */}
            {/* <Route path = "/shop" element = {<Shop />}></Route> */}
            {/* <Route path = "/admin/categorie" element = {<AdminCategory />}></Route> */}
            <Route path = "/admin/home" element = {<AdminPage><AdminHome /></AdminPage>}></Route>
            <Route path = "/admin/users" element = {<AdminPage><AdminUsers /></AdminPage>}></Route>
            {/* <Route path = "/admin/users/:id" element = {<AdminUser/>}></Route> */}
            <Route path = "/admin/references" element = {<AdminPage><AdminReferences /></AdminPage>}></Route>
            {/* <Route path = "/admin/references/:id" element = {<AdminReference />}></Route> */}
            {/* <Route path = "/admin/references/:id/articles" element = {<AdminArticles />}></Route> */}
            {/* <Route path = "/admin/categories" element = {<AdminCategories />}></Route> */}
            <Route path = "/admin/bookings" element = {<AdminPage><AdminBookings /></AdminPage>}></Route>
            {/* <Route path = "/admin/logout" element = {<AdminLogout />}></Route> */}
            <Route path = "/admin/login" element = {<AdminLogin />}></Route>
            {/* <Route path = "/user/account" element = {<UserMyAccount />}></Route> */}
            {/* <Route path = "/user/bookings" element = {<UserBookings/>}></Route> */}
            {/* <Route path = "/user/booking/active" element = {<UserBookingActive />}></Route> */}
            {/* <Route path = "/user/articles" element = {<MaterialLibrary />}></Route> */}
            {/* <Route path = "*" element = {<Error />}></Route>  */}
        </Routes>

    <Header/>


    <Admin />

    </div>
  );
}

export default App;
