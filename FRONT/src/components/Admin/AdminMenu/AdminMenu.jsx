import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './adminmenu.scss';
import api from '../../../requests/index';


const MenuAdmin = ({className, ...rest}) => {

    const handleLogout = (event) => {
        api.logout();
    }

    return (
        <nav className="menuadmin">
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
   );
};

MenuAdmin.propTypes = {
    className: PropTypes.string,
};
MenuAdmin.defaultProps = {
    className: '',
};
export default React.memo(MenuAdmin);
