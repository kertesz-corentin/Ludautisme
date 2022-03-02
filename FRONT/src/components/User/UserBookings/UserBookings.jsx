import React from 'react';
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






const UserBookings = ({className, ...rest}) => {
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
                            <nav aria-label="main mailbox folders">
                                <List className = "list">
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="/user/account">
                                            <ListItemText primary="N ° 45611" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
                        </Box>
                    </div>
                    <div className = "list">
                        <h2>Historique</h2>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <nav aria-label="main mailbox folders">
                            {/* From now links redirect to userAccount Page but will be change with bookings number later */}
                                <List >
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="/user/account">
                                            <ListItemText primary="N ° 45611" />
                                        </ListItemButton>
                                        <ListItemButton component="a" href="/user/account">
                                            <ListItemText primary="N ° 51664" />
                                        </ListItemButton>
                                        <ListItemButton component="a" href="/user/account">
                                            <ListItemText primary="N ° 65514" />
                                        </ListItemButton>
                                        <ListItemButton component="a" href="/user/account">
                                            <ListItemText primary="N ° 16315" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
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
