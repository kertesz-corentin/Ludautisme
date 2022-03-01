import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './userbookings.scss';
import Permanency from '../../Permanency/Permanency';
import MenuUser from '../MenuUser/MenuUser';

const UserBookings = ({className, ...rest}) => {
   return (
    <div> MES RESERVATIONS
    <Permanency/>
    <div
            className={classnames('home-user', className)}
            {...rest}
        >
            <MenuUser/>

    </div>
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
