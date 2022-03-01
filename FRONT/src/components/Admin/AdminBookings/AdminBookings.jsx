import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import './adminbookings.scss';

const AdminBookings = ({className, ...rest}) => {
   return (
       <div
            className={classnames('adminbookings', className)}
            {...rest}
         >
            <AdminSection title="Réservation" />
        </div>
   );
};

AdminBookings.propTypes = {
    className: PropTypes.string,
};
AdminBookings.defaultProps = {
    className: '',
};
export default React.memo(AdminBookings);
