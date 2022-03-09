import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './userbookingshistory.scss';
import Permanency from '../../Permanency/Permanency';
import MenuUser from '../MenuUser/MenuUser';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListOfReferences from '../../ListsOfReferences/ListOfReferences';

const UserBookingsHistory = ({className, ...rest}) => {
   return (
    <div> MON HISTORIQUE DE RESERVATIONS
    <Permanency/>
        <div
                className={classnames('home-user', className)}
                {...rest}
            >
                <MenuUser/>
                <div className = "list">
                    <h2>Historique</h2>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                        {/* From now links redirect to userAccount Page but will be change with bookings number later */}
                            <List >
                                <ListItem disablePadding>
                                <div classnames= "eachList">
                                    <ListItemButton component="a" href="/user/bookings/history">
                                        <ListItemText primary="N ° 45611" />
                                    </ListItemButton>
                                    <ListOfReferences/>
                                </div>
                                <div classnames= "eachList">
                                    <ListItemButton component="a" href="/user/bookings/history">
                                        <ListItemText primary="N ° 51664" />
                                    </ListItemButton>
                                    <ListOfReferences/>
                                </div>
                                <div classnames= "eachList">
                                    <ListItemButton component="a" href="/user/bookings/history">
                                        <ListItemText primary="N ° 65514" />
                                    </ListItemButton>
                                    <ListOfReferences/>
                                </div>
                                <div classnames= "eachList">
                                    <ListItemButton component="a" href="/user/bookings/history">
                                        <ListItemText primary="N ° 16315" />
                                    </ListItemButton>
                                    <ListOfReferences/>
                                </div>
                                </ListItem>
                            </List>
                        </nav>
                    </Box>
                </div>
        </div>
</div>

   );
};

UserBookingsHistory.propTypes = {
    className: PropTypes.string,
};
UserBookingsHistory.defaultProps = {
    className: '',
};
export default React.memo(UserBookingsHistory);
