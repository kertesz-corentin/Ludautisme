import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { Link } from 'react-router-dom'
import logo from './logo.png';
import LoginUser from '../User/LoginUser/LoginUser';
import Shop from '../Shop/Shop';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import './header.scss';

const Header = ({className, ...rest}) => {
    const [value, setValue] = React.useState(0);
    return (
       <header
            className={classnames('header', className)}
            {...rest}>

            <div className="header-logo">
                <img src={logo} className="header-logo-image" alt="Logo" />
            </div>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                className="header-nav">
                    <BottomNavigationAction LinkComponent="/" label="Accueil" value="Accueil" className="header-nav-item" />
                    <BottomNavigationAction LinkComponent="/association" label="Association" value="Association" className="header-nav-item" />
                    <BottomNavigationAction LinkComponent="/library" label="Matériathèque" value="Matériathèque" className="header-nav-item" />
                    <BottomNavigationAction LinkComponent="/infos" label="Infos Pratiques" value="Infos Pratiques" className="header-nav-item" />
                    <BottomNavigationAction LinkComponent="/usefull_links" label="Liens Utiles" value="Liens Utiles" className="header-nav-item" />
            {/* <NavLink to="/Accueil">Accueil
            </NavLink> */}
            </BottomNavigation>
            <Shop />
            <LoginUser />
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
