import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Logo from '../public/logo.png';
import LoginUser from '../User/LoginUser/LoginUser'
import './header.scss';
import { NavLink } from 'react-router-dom';
import CartModal from '../CartModal/CartModal';
import Cart from '../Cart/Cart';
import Box from '@mui/material/Box';




const Header = ({
    className,
    currentItemsNumber,
    currentItems,
    cartManager,
     ...rest}) => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {}, [userToken])

    return (
       <header
            className={classnames('header', className)}
            id="myHeader"
            {...rest}>
        <Box className="header-content">
            <div className="header-logo">
                <img src={Logo} className="header-logo-img" alt="Logo" />
            </div>

            <nav className="header-nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Accueil
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Association
                </NavLink>
                <NavLink
                    to="/materiallibrary"
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Matériathèque
                </NavLink>
                <NavLink
                    to="/infos"
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Infos pratiques
                </NavLink>
                <NavLink
                    to="/usefullLinks"
                    className={({ isActive }) => isActive ? 'header-nav-link header-nav-link--active' : 'header-nav-link'}
                >
                    Liens utiles
                </NavLink>
            </nav>
                    <Cart cartManager={cartManager}currentItems = {currentItems}/>
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

