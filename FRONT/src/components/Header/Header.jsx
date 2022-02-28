import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom'
import logo from './logo.png';
import './header.scss';

const Header = ({className, ...rest}) => {
   return (
       <header
            className={classnames('header', className)}
            {...rest}>
            <img src={logo} className="header-logo" alt="Logo" />
            <nav>
                    <NavLink to="/"> Accueil</NavLink>
                    <NavLink to="/Notre association">Notre association</NavLink>
                    <NavLink to="/Matériathèque">Matériathèque</NavLink>
                    <NavLink to="/Infos pratique">Infos pratique</NavLink>
                    <NavLink to="/Liens utiles">Liens utiles</NavLink>
            {/* <NavLink to="/Accueil">Accueil
            </NavLink> */}
            </nav>
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
