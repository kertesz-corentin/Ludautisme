import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './adminmenu.scss';

const MenuAdmin = ({className, ...rest}) => {
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

            <button
                href="/admin/logout"
                className="menuadmin-logout"
            >
                Se déconnecter
            </button>
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
