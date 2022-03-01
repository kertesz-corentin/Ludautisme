import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './userbookings.scss';

const UserBookings = ({className, ...rest}) => {
   return (
       <div
            className={classnames('userbookings', className)}
            {...rest}
         >
            PAGES DE RESERVATION D'UN USER
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
