import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './menuUser.scss';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import ModifyPasswordModal from '../ModifyPasswordModal/ModifyPasswordModal';
import {useNavigate} from "react-router-dom";
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

const MenuUser = ({className,display,handleCloseLogin, ...rest}) => {
    const navigate = useNavigate();

    const buttonMyAccount =  <Button >Mon Compte</Button>;
    const buttonMyBookings = <Button >Mes Réservations</Button>;
    function handleClick() {
        console.log(`Je souhaite modifier mon mdp`)
    }

    const goToAccount = async () => {
        handleCloseLogin();
        navigate('/user/account');
    }

    const goToBookings = () => {
        handleCloseLogin();
        navigate('/user/bookings');

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
    >   <Button onClick={goToAccount}>Mon Compte</Button>
        <Button onClick={goToBookings}>Mes Réservations</Button>
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
