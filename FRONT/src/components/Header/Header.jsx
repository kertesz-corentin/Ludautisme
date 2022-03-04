import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Logo from '../public/logo.png';
import LoginUser from '../User/LoginUser/LoginUser'
import Shop from '../Shop/Shop';
import { BottomNavigation, BottomNavigationAction, Tabs, Tab, Button, AppBar   } from '@mui/material';
import './header.scss';
import HomePage from '../HomePage/HomePage';
import { NavLink } from "react-router-dom";
import About from '../About/About';
import Library from '../Library/Library';
import Infos from '../Infos/Infos';
import UsefullLinks from '../UsefullLinks/UsefullLinks';


const Header = ({className, ...rest}) => {
    const routeMatch = useRouteMatch(['/', '/about', '/materiallibrary', '/infos', '/usefullLinks' ]);
    const currentTab = routeMatch?.pattern?.path;

    const tabNameToIndex = {
        0: "HomePage",
        1: "About",
        2: "Library",
        3: "Infos",
        4: "UsefullLinks",
      };
      const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

      const handleChange = (event, newValue) => {
        history.push(`/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
      };

    return (
       <header
            className={classnames('header', className)}
            {...rest}>
            <div>
            {/* <div className="header-logo">
                <img src={Logo} className="header-logo-image" alt="Logo" />
            </div> */}
            {/* <BottomNavigation
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
            </BottomNavigation> */}

                {/* <Button variant="text" href="/toto">tata</Button>
                <Button variant="text" href="/tata">toto</Button>
                <Button variant="text" href="/Jeux">Jeux</Button> */}
            </div>

            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label="HomePage" />
                <Tab label="About" />
                <Tab label="Library" />
                <Tab label="Infos" />
                <Tab label="UsefullLinks" />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <HomePage />}
            {selectedTab === 1 && <About />}
            {selectedTab === 1 && <Library />}
            {selectedTab === 1 && <Infos />}
            {selectedTab === 1 && <UsefullLinks />}



            {/* <Shop />
            <LoginUser /> */}
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

