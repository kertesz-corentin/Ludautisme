/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AdminHeader.scss';
import {
    AppBar, Toolbar, Container, Menu, MenuItem, Typography, IconButton, Box, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

function AdminHeader() {

    // Active tab
    const [isActive, setIsActive] = useState();

    const handleActive = (event) => {
        setIsActive(event);
    };

    // Accueil Adhérents Références Réservations Se déconnecter
    const pages = {
        Home: { url: '/admin2/home', display: <HomeIcon /> },
        Users: { url: '/admin2/users', display: 'Adhérents' },
        References: { url: '/admin2/references', display: 'Références' },
        Articles: { url: '/admin2/bookings', display: 'Réservations' },
        Categories: { url: '/admin2/categories', display: 'Categories' },
        Images: { url: '/admin2/images', display: 'Images' },
    };

    // Menu Interaction
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar id="appbar" position="sticky">
            <Container>
                <Toolbar disableGutters>
                    {/* Mobile Button */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <IconButton onClick={handleOpenNavMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="appbar__menu"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            keepMounted
                        >
                            {Object.keys(pages).map((page) => (
                                <MenuItem key={page}>
                                    <Typography>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* Desktop buttons */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {Object.keys(pages).map((page) => (
                            <Link
                                key={page}
                                className={(isActive === page) ? ' link isActive' : 'link'}
                                to={pages[page].url}
                                onClick={() => { handleActive(page); }}
                            >
                                <Button

                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {pages[page].display}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* <ImportStatus /> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default React.memo(AdminHeader);
