import React, {useState, useEffect} from 'react';
import UserMyAccount from '../UserMyAccount/UserMyAccount';
import UserBookings from '../UserBookings/UserBookings';
import PropTypes from 'prop-types';
import { Tabs , Tab, Box } from '@mui/material';
import  { useNavigate } from 'react-router-dom';
// Import components
import './userhome.scss';
import UserFavorite from '../UserFavorite/UserFavorite';

const UserHome = ({
    className,
    children,
    currentItemsNumber,
    currentItems,
    cartManager,
     ...rest}) => {
    
    const navigate = useNavigate();
    const currUrl = window.location.pathname;
 
    
    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
            </div>
        );
    }

    const pages = [
        { url: '/user/account', display: 'Mon compte' },
        { url: '/user/bookings', display: 'Mes réservations' },
        { url: '/user/favorites', display: 'Mes favoris' },
    ];
    const [isActive,setIsActive] = useState(0);
    
    const setCurrUrl = ()=>{
        setIsActive(pages.findIndex((page)=> page.url.includes(currUrl)));
    }

     const handleActive = (event,newValue) => {
        setIsActive(newValue);
        navigate(pages[newValue].url);
    };

    useEffect(()=>{
        setCurrUrl();
    },[navigate]);

   return (
        <Box>
        <Tabs value={isActive} onChange={handleActive} aria-label="basic tabs example">
        {pages.map((page)=>(
            <Tab key={page.display} label={page.display} />
        ))  
        }
        </Tabs>
        <TabPanel value={isActive} index={0}>
            <UserMyAccount/>
        </TabPanel>
        <TabPanel value={isActive} index={1}>
            <UserBookings/>
        </TabPanel>
        <TabPanel value={isActive} index={2}>
            <UserFavorite/>
        </TabPanel>
        </Box>
   );
};

UserHome.propTypes = {
    className: PropTypes.string,
};
UserHome.defaultProps = {
    className: '',
};
export default React.memo(UserHome);
