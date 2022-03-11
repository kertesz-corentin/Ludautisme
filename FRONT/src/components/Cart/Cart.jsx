import React, {useState, useContext}from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './cart.scss';
import OneRef from '../OneRef/OneRef';
import { FunctionContext } from '../App/App';


const Cart = ({className, ...rest}) => {

   const [cartItems, setCartItems] = useState([])
   function handleShopBtnClick (event) {
    event.preventDefault();
    console.log(`ouverture de la modale mon panier`)
   }
   return (
       <button
            className={classnames('cart', className)}
            {...rest}
            onClick= {handleShopBtnClick}
         >
            <OneRef/>
        </button>
   );
};

Cart.propTypes = {
    className: PropTypes.string,
};
Cart.defaultProps = {
    className: '',
};
export default React.memo(Cart);
