import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Logo from '../public/logo.png';
import LoginUser from '../User/LoginUser/LoginUser'
import './header.scss';
// import { NavLink } from 'react-router-dom';
// import CartModal from '../CartModal/CartModal';
import Cart from '../Cart/Cart';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import {Button} from '@mui/material'



const Header = ({
    className,
    currentItemsNumber,
    currentItems,
    cartManager,
     ...rest}) => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {}, [userToken])


    const navigate = useNavigate();
    const goTo = (event)=>{
        navigate(event.target.value);
    }

    return (
       <header
            className={classnames('header', className)}
            id="myHeader"
            {...rest}>
        <Box className="header-content">
            <div className="header-logo">
                <img src={Logo} className="header-logo-img" alt="Logo" />
            </div>



            <nav>
                <label for="toggleheader">☰</label>
                <input type="checkbox" id="toggleheader" />

                <div className="main_pages">
                <Button
                    value = '/'
                    onClick = {goTo}
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Accueil
                </Button>
                <Button
                    value = '/about'
                    onClick = {goTo}
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Association
                </Button>
                <Button
                    value = '/materiallibrary'
                    onClick = {goTo}
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Matériathèque
                </Button>
                <Button
                    value = '/infos'
                    onClick = {goTo}
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Infos pratiques
                </Button>
                <Button
                    value = '/usefullLinks'
                    onClick = {goTo}
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Liens utiles
                </Button>
                </div>
            </nav>
                    <Cart cartManager={cartManager} currentItems = {currentItems}/>
                    <LoginUser/>
            </Box>
        </header>
   );
};

Header.propTypes = {
    className: PropTypes.string,
};
Header.defaultProps = {
    className: '',
};

export default React.memo(Header);

