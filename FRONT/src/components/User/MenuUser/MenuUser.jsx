import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './menuUser.scss';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router';










const MenuUser = ({className, ...rest}) => {



    const buttonMyAccount =  <Button key="one" type = "click"  >Mon Compte</Button>;
    const buttonMyBookings = <Button key="two" type = "click"  >Mes Réservations</Button>;

   return (
       <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"

      >
       <NavLink to="/user/account"> {buttonMyAccount}</NavLink>
       <NavLink to="/user/bookings"> {buttonMyBookings}</NavLink>
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
