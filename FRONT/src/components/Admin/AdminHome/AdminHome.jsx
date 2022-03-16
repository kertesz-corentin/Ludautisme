import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// import react components
import AdminPermanency from '../AdminPermanency/AdminPermanency';

import './adminhome.scss';

const AdminHome = ({isLogged, className, ...rest}) => {
    return (
        <div
            className={classnames('adminhome', className)}
            {...rest}
         >
            Accueil
            <AdminPermanency />
        </div>
    );
};

AdminHome.propTypes = {
    isLogged: PropTypes.bool,
};
AdminHome.defaultProps = {
    isLogged: false,
};
export default React.memo(AdminHome);
