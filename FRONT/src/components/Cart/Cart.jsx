import React, {useState, useEffect}from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './cart.scss';
import Reference from '../Reference/Reference';
import CartModal from '../CartModal/CartModal';
import { Box } from '@mui/material';


const Cart = ({
    className,
    currentItems,
     ...rest}) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const [userToken, setUserToken] = useState ();
    const [userId, setUserId] = useState ();

    if (user && !userToken && !userId){
        setUserToken(user.token) ;
        setUserId(user.id);
    }

   function handleCartBtnClick (event) {
    event.preventDefault();

   }
   return (
       <Box>
       {userToken &&
       <button
            className={classnames('cart', className)}
            {...rest}
            onClick= {handleCartBtnClick}
         >
            <CartModal userId = {userId} currentItems = {currentItems}/>
        </button>
       }
        </Box>
   );
};

Cart.propTypes = {
    className: PropTypes.string,
    currentItems: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            id: PropTypes.number.isRequired,
            maincategory: PropTypes.string,
            name:PropTypes.string.isRequired,
            picture:PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    url: PropTypes.string.isRequired
                }).isRequired
            ),
            tag:PropTypes.arrayOf(
                PropTypes.shape({
                  index:PropTypes.string
                })
            ),
            valorisation: PropTypes.number.isRequired
        })
    )
};
Cart.defaultProps = {
    className: '',
};
export default React.memo(Cart);
