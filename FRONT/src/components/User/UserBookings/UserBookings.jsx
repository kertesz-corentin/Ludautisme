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
import ListOfReferences from '../../ListsOfReferences/ListOfReferences';






const UserBookings = ({className, ...rest}) => {
    const [bookings, setBookings] = useState([]);
    const [activeBooking, setActiveBooking] = useState([]);
    const [nextBooking, setNextBooking] = useState([]);
    const [idUser,setIdUser] = useState(0);


    const getBookings = async() => {
        try {
            const { id } = await JSON.parse(localStorage.getItem('user'));
            const response = await api.get(`/customer/booking/history/${id}`);
            let data = await response.data;
            console.log("data",data);
            data = data.map((booking) => {
                booking['references'] = booking.articles.map((article) => {
                    return {
                            id: article.id_ref,
                            name: article.name_ref,
                            description: article.description_ref,
                            art_id: article.id,
                            picture: [
                                {
                                    id:article.id_picture_ref,
                                    url:article.url_picture_ref,
                                    text:article.text_picture_ref,
                                }
                            ],
                        }
                });
                delete booking.articles;
                return booking
            });
            setBookings(data);
            console.log(data);

            //Next Permanency
            const nextFilter = (data) ?
            await data.filter((booking)=> booking.is_next_permanency)
            : [];
            setNextBooking(nextFilter);

            //Active permanency
            const activeFilter = (data) ?
            await data.filter((booking)=> booking.active_permanency)
            : [];
            setActiveBooking(activeFilter);
            //Old Bookings


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
            <div
                    className={classnames('home-user', className)}
                    {...rest}
                >
                    <MenuUser/>
                    <Box className = "list" sx={{ bgcolor: 'background.paper' }}>
                        <h2>Réservation prochaine permanence</h2>
                        <Permanency/>
                        <Box sx={{ bgcolor: 'background.paper' }}>
                            { (nextBooking[0]) ?
                                <ListOfReferences references= {nextBooking[0].references}/>
                            :
                            <div>WAIT</div>}
                            {console.log('next',nextBooking)}
                        </Box>
                        <h2>Emprunt en cours</h2>
                        <Box sx={{ bgcolor: 'background.paper' }}>
                            { (activeBooking[0]) ?
                                <ListOfReferences references= {activeBooking[0].references}/>
                            :
                            <div>WAIT</div>}
                            {console.log('active',activeBooking[0])}
                        </Box>
                        <h2>Historique</h2>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        </Box>
                    </Box>
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
