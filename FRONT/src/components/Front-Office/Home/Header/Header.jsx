import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Logo from '../../../../public/logo.png';
import LoginUser from '../../User/LoginUser/LoginUser';
import './header.scss';
// import { NavLink } from 'react-router-dom';
// import CartModal from '../CartModal/CartModal';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Popover from '@mui/material/Popover';


const Header = ({
    className,
    currentItemsNumber,
    currentItems,
    cartManager,
    ...rest }) => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    const [isActive, setIsActive] = useState();

    const pages = {
        test1: { url: '/', display: <HomeIcon /> },
        test2: { url: '/about', display: 'Association' },
        test3: { url: '/materiallibrary', display: 'Matériathèque' },
        test4: { url: '/infos', display: 'Infos pratiques' },
        test5: { url: '/usefullLinks', display: 'Liens utiles' }
    };
    const favori = { url: '/user/favorites', display: 'Favoris'}

    const handleActive = (event) => {
        setIsActive(event);
    };

    const [anchorMenu, setAnchorMenu] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorMenu(null);
    };

    const open = Boolean(anchorMenu);

    const id = open ? 'simple-popover' : undefined;

    useEffect(() => { }, [userToken])

    return (
        <header
            className={classnames('header', className)}
            id="myHeader"
            {...rest}>
            <Box className="header-content">
                <div className="header-logo">
                    <img src={Logo} className="header-logo-img" alt="Logo" />
                </div>

                <nav>
                    <div>
                        <Button className="button-menu" aria-describedby={id} variant="ctext" onClick={handleClickMenu}>
                            <MenuIcon/>
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorMenu}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                            }}
                        >
                            <div className="mobile-menu">
                        {
                            Object.keys(pages).map((page) => (
                                <Link
                                    key={page}
                                    className={(isActive === page) ? 'header-link header-link--isActive' : 'header-link'}
                                    to={pages[page].url}
                                    onClick={() => { handleActive(page); }}
                                >
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {pages[page].display}
                                    </Button>
                                </Link>
                            ))
                        }
                        {(userToken) && <Link
                                    key={favori}
                                    className={(isActive === favori) ? 'header-link header-link--isActive' : 'header-link'}
                                    to={favori.url}
                                    onClick={() => { handleActive(favori); }}
                                >
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {favori.display}
                                    </Button>
                                </Link>}
                        <div className="header-items">
                            <LoginUser />
                        </div>
                    </div>
                        </Popover>
                    </div>

                    <div className="main_pages">
                        {
                            Object.keys(pages).map((page) => (
                                <Link
                                    key={page}
                                    className={(isActive === page) ? 'header-link header-link--isActive' : 'header-link'}
                                    to={pages[page].url}
                                    onClick={() => { handleActive(page); }}
                                >
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {pages[page].display}
                                    </Button>
                                </Link>
                            ))
                        }
                         {(userToken) && <Link
                                    key={favori}
                                    className={(isActive === favori) ? 'header-link header-link--isActive' : 'header-link'}
                                    to={favori.url}
                                    onClick={() => { handleActive(favori); }}
                                >
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {favori.display}
                                    </Button>
                                </Link>}
                        <div className="header-items">
                            <LoginUser />
                        </div>
                    </div>
                </nav>

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

