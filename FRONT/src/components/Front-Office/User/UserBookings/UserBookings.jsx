import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './userbookings.scss';
import {Box,Divider, Typography} from '@mui/material';
import api from '../../../../requests';
import ListOfReferences from '../../MaterialLibrary/MaterialLibraryComponents/ListsOfReferences/ListOfReferences';
import ListOfBookings from './ListOfBookings/ListOfBookings';
import moment from 'moment';
moment().locale('fr');




const UserBookings = ({className, ...rest}) => {
    const [activeBooking, setActiveBooking] = useState([]);
    const [nextBooking, setNextBooking] = useState([]);
    const [oldBookings, setOldBookings] = useState([]);


    const getBookings = async() => {
        try {
            const { id } = await JSON.parse(localStorage.getItem('user'));

            //Get active permanency
            const perm = await api.get(`/customer/permanency/`);
            const activePerm = perm.data;
            //Get bookings
            const response = await api.get(`/customer/booking/history/${id}`);
            let data = await response.data;
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
                booking.date_permanency = (booking.date_permanency)
                ? `le : ${moment(booking.date_permanency).format("DD MMMM YYYY")}`
                :  `en ${moment(activePerm[0].perm_date).add(1, 'M').format("MMMM YYYY")}`;
                booking.return_date_permanency = (booking.return_date_permanency)
                ? `le : ${moment(booking.return_date_permanency).format("DD MMMM YYYY")}`
                : `en ${moment(activePerm[0].perm_date).add(1, 'M').format("MMMM YYYY")}`;
                delete booking.articles;
                return booking
            });

            //Next Permanency
            const nextFilter = (data) ?
            await data.filter((booking)=> booking.is_next_permanency && !booking.delivered)
            : [];
            setNextBooking(nextFilter);

            //Active permanency
            const activeFilter = (data) ?
            await data.filter((booking)=> booking.active_permanency || (booking.is_next_permanency && booking.delivered && !booking.closed ))
            : [];
            setActiveBooking(activeFilter);
            //Old Bookings
            const oldFilter = (data) ?
            await data.filter((booking)=> (!booking.active_permanency && !booking.is_next_permanency) || booking.closed)
            : [];

            setOldBookings(oldFilter.sort((a,b)=>{return (a.id - b.id > 0) ? -1 : 1}));



        }
        catch (err) {
            console.error (err);
        }
    }

    const gridSize = 275;
    const displayCountRefBooked = (references) => (`( ${references.references.length} article${(references.references.length>1)?'s':''} )`)
    // const displayCountRefBooked = (references) => (console.log(references.references.length));
    

    useEffect(() => {
        getBookings();
    }, []);

   return (
            <div
                    className={classnames('home-user', className)}
                    {...rest}
                >
                    <Box className = "list" sx={{ bgcolor: 'background.paper' }}>
                        <Box className='booking__wrapper'>
                        <Box className="booking__title ">
                            <h2>Réservation prochaine permanence {(nextBooking[0]) && displayCountRefBooked(nextBooking[0])} </h2>
                        </Box>
                        { (nextBooking[0])?
                        <>
                        <Typography className="booking__info">#{nextBooking[0].id} - A venir récupérer {nextBooking[0].date_permanency}</Typography>
                        {/* <Permanency/> */}
                        <Box className="clay" sx={{ bgcolor: 'background.paper' }}>
                                <ListOfReferences
                                    display="booking"
                                    references= {nextBooking[0].references}
                                    gridSize={gridSize}
                                />
                        </Box>
                        </>
                        :
                        <>Vous n'avez pas de réservations pour la prochaine permanence</>
                        }
                        </Box>
                        <Divider className="booking__divider"/>

                        <Box className="booking__wrapper ">
                        <Box className="booking__title ">
                            <h2>Emprunt en cours {(activeBooking[0]) && displayCountRefBooked(activeBooking[0])}</h2>
                        </Box>
                        { (activeBooking[0]) ?
                        <>
                        <Typography className="booking__info">#{activeBooking[0].id} - A rendre {activeBooking[0].return_date_permanency}</Typography>
                        <Box className="clay" sx={{ bgcolor: 'background.paper' }}>
                                <ListOfReferences
                                    display="booking"
                                    references= {activeBooking[0].references}
                                    gridSize={gridSize}
                                />
                        </Box>
                        </>
                        : <>Vous n'avez pas d'emprunt en cours</>
                         }
                        </Box>

                         <Divider className="booking__divider"/>
                        { (oldBookings.length>0)&&
                            <Box className="booking__wrapper">
                            <Box className="booking__title ">
                                <h2>Historique</h2>
                            </Box>
                            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListOfBookings bookings = {oldBookings}/>

                            </Box>
                            </Box>
                        }
                    </Box>
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
