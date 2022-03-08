import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './paypal.scss';

const Paypal = ({className, ...rest}) => {
   return (
       <div className={classnames('paypal', className)}
            {...rest}>



        </div>
   );
};

Paypal.propTypes = {
    className: PropTypes.string,
};
Paypal.defaultProps = {
    className: '',
};
export default React.memo(Paypal);

