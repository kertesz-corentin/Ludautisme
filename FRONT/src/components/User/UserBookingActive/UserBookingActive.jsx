import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './userbookingactive.scss';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Permanency from '../../Permanency/Permanency';
import MenuUser from '../MenuUser/MenuUser';
import ListOfReferences from '../../ListsOfReferences/ListOfReferences';

const UserBookingActive = ({className, ...rest}) => {

// Add request api.get ('admin/booking/active/:id)
   return (
        <div> MA RESERVATIONS EN COURS
            <Permanency/>
                <div
                        className={classnames('home-user', className)}
                        {...rest}
                    >
                        <MenuUser/>
                        <div className = "list">
                            <h2>En cours</h2>
                            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <nav aria-label="main mailbox folders">
                                    <List className = "list">
                                        <ListItem disablePadding>
                                            <ListItemButton component="a" href="/user/booking/active">
                                                <ListItemText primary="N ° 45611" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                    <ListOfReferences/>
                                </nav>
                            </Box>
                        </div>
                </div>
        </div>
   );
};

UserBookingActive.propTypes = {
    className: PropTypes.string,
};
UserBookingActive.defaultProps = {
    className: '',
};
export default React.memo(UserBookingActive);
