import React from 'react';
import PropTypes from 'prop-types';
import './menuUser.scss';
import {Button,Box} from '@mui/material';
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

     const goToFavorites = () => {
        handleCloseLogin();
        navigate('/user/favorites');

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
        <Button onClick={goToFavorites}>Mes Favoris</Button>
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
