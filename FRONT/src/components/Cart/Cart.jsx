import React, {useState, useContext}from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './cart.scss';
import Reference from '../Reference/Reference';


const Cart = ({className, ...rest}) => {

   const [cartItems, setCartItems] = useState([])
   function handleCartBtnClick (event) {
    event.preventDefault();
    console.log(`ouverture de la modale mon panier`)
   }
   return (
       <button
            className={classnames('cart', className)}
            {...rest}
            onClick= {handleCartBtnClick}
         >
            <Reference/>
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
