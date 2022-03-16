import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './menuUser.scss';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import ModifyPasswordModal from '../ModifyPasswordModal/ModifyPasswordModal';

const MenuUser = ({className,display,closeLoginMenu, ...rest}) => {

    const buttonMyAccount =  <Button >Mon Compte</Button>;
    const buttonMyBookings = <Button >Mes Réservations</Button>;
    function handleClick() {
        console.log(`Je souhaite modifier mon mdp`)
    }

   return (
       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          m: 1,
        },
      }}
    >
       <NavLink className='menu-user-button1' to="/user/account" onClick={closeLoginMenu}> {buttonMyAccount}</NavLink>
       <NavLink className='menu-user-button1'  to="/user/bookings" onClick={closeLoginMenu}> {buttonMyBookings}</NavLink>
       {display !== "login" &&
            <ModifyPasswordModal/>
        }
    </Box>
   );
};

MenuUser.propTypes = {
    className: PropTypes.string,
};
MenuUser.defaultProps = {
    className: '',
};
export default React.memo(MenuUser);
