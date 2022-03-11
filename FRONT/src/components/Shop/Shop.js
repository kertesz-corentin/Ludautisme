import React, {useState}from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './shop.scss';
import ShopModal from '../ShopModal/ShopModal';


const Shop = ({className, ...rest}) => {
   const [shopItems, setShopItems] = useState()
   function handleShopBtnClick (event) {
    event.preventDefault();
    console.log(`ouverture de la modale mon panier`)
   }
   return (
       <button
            className={classnames('shop', className)}
            {...rest}
            onClick= {handleShopBtnClick}
         >
            <ShopModal/>
        </button>
   );
};

Shop.propTypes = {
    className: PropTypes.string,
};
Shop.defaultProps = {
    className: '',
};
export default React.memo(Shop);
