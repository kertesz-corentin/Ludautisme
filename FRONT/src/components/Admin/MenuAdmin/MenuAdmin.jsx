import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './menuadmin.scss';

const MenuAdmin = ({className, ...rest}) => {
    return (
        <nav className="menuadmin">
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
            >
                Accueil
            </NavLink>

            <NavLink
                to="/users"
                className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
            >
                Adhérents
            </NavLink>

            <NavLink
                to="/articles"
                className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
            >
                Articles
            </NavLink>

            <NavLink
                to="/bookings"
                className={({ isActive }) => isActive ? 'menuadmin-link menuadmin-link--active' : 'menuadmin-link'}
            >
                Réservations
            </NavLink>

            <NavLink
                to="/logout"
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
