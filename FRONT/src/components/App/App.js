
import Header from '../../components/Header/Header';
<<<<<<< HEAD
import HomeUser from '../User/UserMyAccount/UserMyAccount';
=======
import HomeUser from '../User/HomeUser/HomeUser';
>>>>>>> 1868c2a05fd825194064091ef4baebdc248c861b
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import UserMyAccount from '../User/UserMyAccount/UserMyAccount';


function App() {
  return (
    <div className="App">
<<<<<<< HEAD
        <Header/>
        <Routes>
            {/* <Route path = "/" element = {<HomePage />}></Route> */}
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
            {/* <Route path = "/user/bookings" element = {<UserBookings/>}></Route> */}
            {/* <Route path = "/user/booking/active" element = {<UserBookingActive />}></Route> */}
            {/* <Route path = "/user/articles" element = {<MaterialLibrary />}></Route> */}
            {/* <Route path = "*" element = {<Error />}></Route>  */}
        </Routes>
=======
    <Header/>
    <HomeUser/>
>>>>>>> 1868c2a05fd825194064091ef4baebdc248c861b
    </div>
  );
}

export default App;
