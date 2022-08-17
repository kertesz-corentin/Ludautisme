import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Logo from '../../../../public/logo.png';
import LoginUser from '../../User/LoginUser/LoginUser'
import './header.scss';
// import { NavLink } from 'react-router-dom';
// import CartModal from '../CartModal/CartModal';
import Cart from '../../Cart/Cart';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';


const Header = ({
    className,
    currentItemsNumber,
    currentItems,
    cartManager,
     ...rest}) => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    const [isActive,setIsActive] = useState();

    const pages = {
        test1:{ url: '/', display: <HomeIcon /> },
        test2:{ url: '/about', display: 'Association' },
        test3:{ url: '/materiallibrary', display: 'Mathériathèque' },
        test4:{ url: '/infos', display: 'Infos pratiques' },
        test5:{ url: '/usefullLinks', display: 'Liens utiles' },
    };

    const handleActive = (event) => {
        setIsActive(event);
    };

    useEffect(() => {}, [userToken])

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
                <label className="toggleheader" for="toggleheader">
                    <MenuIcon/>
                </label>
                <input type="checkbox" id="toggleheader" />

                <div className="main_pages">
                {
                    Object.keys(pages).map((page)=>(
                        <Link
                                key={page}
                                className={(isActive === page) ? 'header-link header-link--isActive' : 'header-link'}
                                to={pages[page].url}
                                onClick={() => { handleActive(page); }}
                            >
                                <Button
                                    //onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {pages[page].display}
                                </Button>
                        </Link>
                    ))
                }
                <div className="header-items">
                    {(userToken)&&<Cart cartManager={cartManager} currentItems = {currentItems}/>}
                    <LoginUser/>
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

