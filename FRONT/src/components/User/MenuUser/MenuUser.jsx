import React from 'react';
import PropTypes from 'prop-types';
import './menuUser.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ModifyPasswordModal from '../ModifyPasswordModal/ModifyPasswordModal';
import {useNavigate} from "react-router-dom";

const MenuUser = ({className,display,handleCloseLogin, ...rest}) => {
    const navigate = useNavigate();

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
