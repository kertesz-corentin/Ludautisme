import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './userbookings.scss';
import Permanency from '../../Permanency/Permanency';
import MenuUser from '../MenuUser/MenuUser';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import api from '../../../requests';
import ListOfArticles from '../../ListsOfArticles/ListOfArticles';






const UserBookings = ({className, ...rest}) => {
    const [bookings, setBookings] = useState([]);
    const [activeBooking, setActiveBooking] = useState([]);
    const [idUser,setIdUser] = useState(0);


    const getBookings = async() => {
        try {
            const { id } = await JSON.parse(localStorage.getItem('user'));
            const response = await api.get(`/customer/booking/history/${id}`);
            const data = await response.data;
            setBookings(data);
            const activeFilter = (data) ?
            await data.filter((booking)=> booking.active_permanency)
            :
            [];
            setActiveBooking(activeFilter);
        }
        catch (err) {
            console.error (err);
        }
    }

    useEffect(() => {
        getBookings();
    }, []);

   return (
    <div> MES RESERVATIONS
        <Permanency/>
            <div
                    className={classnames('home-user', className)}
                    {...rest}
                >
                    <MenuUser/>
                    <div className = "list">
                        <h2>En cours</h2>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            { (activeBooking[0]) ?
                                <ListOfArticles articles= {activeBooking[0].articles}/>
                            :
                            <div>WAIT</div>}
                            {console.log('test',activeBooking[0])}
                        </Box>
                    </div>
                    <div className = "list">
                        <h2>Historique</h2>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        </Box>
                    </div>
            </div>
    </div>


   );
};

UserBookings.propTypes = {
    className: PropTypes.string,
};
UserBookings.defaultProps = {
    className: '',
};
export default React.memo(UserBookings);
