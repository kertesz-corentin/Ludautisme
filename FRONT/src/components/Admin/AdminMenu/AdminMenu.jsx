import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './adminmenu.scss';

const MenuAdmin = ({className, ...rest}) => {
    return (
        <nav className="menuadmin">
            <NavLink
                to="/admin"
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
                to="/admin/articles"
                className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
            >
                Articles
            </NavLink>

            <NavLink
                to="/admin/bookings"
                className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
            >
                Réservations
            </NavLink>

            <NavLink
                to="/admin/logout"
                className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
            >
                Se déconnecter
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
