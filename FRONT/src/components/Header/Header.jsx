import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Route,
    NavLink,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'
import './header.scss';
import logo from '../Header/logo-lud.jpg'

const Header = ({className, ...rest}) => {
   return (
       <header
            className={classnames('header', className)}
            {...rest}>
            <img className='App-logo' src={logo} alt="Logo" />
            <nav>
                <ul>
                    <li>Accueil</li>
                    <li>Notre association</li>
                    <li>Matériathèque</li>
                    <li>Infos pratique</li>
                    <li>Liens utiles</li>
                </ul>
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
