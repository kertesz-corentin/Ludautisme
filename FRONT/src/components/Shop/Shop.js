import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './shop.scss';

const Shop = ({className, ...rest}) => {
   return (
       <button
            className={classnames('shop', className)}
            {...rest}
         >
            <ShoppingCartIcon />
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
