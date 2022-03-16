import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './menuUser.scss';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import ModifyPasswordModal from '../ModifyPasswordModal/ModifyPasswordModal';

const MenuUser = ({className,display, ...rest}) => {

    const buttonMyAccount =  <Button className='test1' key="one" type = "click"  >Mon Compte</Button>;
    const buttonMyBookings = <Button key="two" type = "click"  >Mes Réservations</Button>;
    function handleClick() {
        console.log(`Je souhaite modifier mon mdp`)
    }

   return (
       <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup className='test3'
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"

      >
       <NavLink className='menu-user-button1' to="/user/account"> {buttonMyAccount}</NavLink>
       <NavLink className='menu-user-button1'  to="/user/bookings"> {buttonMyBookings}</NavLink>
       {display !== "login" &&
            <ModifyPasswordModal/>
        }
      </ButtonGroup>
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
