import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './menuUser.scss';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

function handleClick  (event) {
console.log('coucou',event)
}


  const buttonMyAccount =  <Button key="one" type = "click" onClick = {handleClick} >Mon Compte</Button>;
  const buttonMyBookings = <Button key="two" type = "click" onClick = {handleClick} >Mes Réservations</Button>;
  const buttonDisconnect =   <Button key="three" type = "click" onClick = {handleClick} >Se déconnecter</Button>;
  ;

const MenuUser = ({className, ...rest}) => {
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
       <NavLink to="/MyAccount"> {buttonMyAccount}</NavLink>
       <NavLink to="/MyBookings"> {buttonMyBookings}</NavLink>
       <NavLink to="/Disconnect"> {buttonDisconnect}</NavLink>
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
