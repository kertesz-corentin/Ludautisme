import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './adminmenu.scss';
import api from '../../../requests/index';

import Logo from '../../../public/logo.png';


const MenuAdmin = ({className, ...rest}) => {

    const handleLogout = (event) => {
        api.logout();
    }

    return (
        <header className="menuadmin">
            <div className="menuadmin-logo">
                    <img src={Logo} className="menuadmin-logo-img" alt="Logo de lud'autisme" />
            </div>
            <nav className="menuadmin-nav">

                <NavLink
                    to="/admin/home"
                    className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
                >
                    Accueil
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
                >
                    Adhérents
                </NavLink>
                <NavLink
                    to="/admin/references"
                    className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
                >
                    Références
                </NavLink>
                <NavLink
                    to="/admin/bookings"
                    className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
                >
                    Réservations
                </NavLink>
                <NavLink to="/admin">
                    <button
                        onClick={handleLogout}
                        className="menuadmin-logout"
                    >
                        Se déconnecter
                    </button>
                </NavLink>
            </nav>
        </header>
   );
};

MenuAdmin.propTypes = {
    className: PropTypes.string,
};
MenuAdmin.defaultProps = {
    className: '',
};
export default React.memo(MenuAdmin);
