import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminHome from './AdminHome/AdminHome';
import AdminLogin from './AdminLogin/AdminLogin';
import './admin.scss';

const Admin = ({isLogged, className, ...rest}) => {
   return (
       <div
            className={classnames('admin', className)}
            {...rest}
         >
        {!isLogged && (
            <AdminLogin />
        )}

        {isLogged && (
            <AdminHome />
        )}
        </div>
   );
};

Admin.propTypes = {
    className: PropTypes.string,
    isLogged: PropTypes.bool,
};
Admin.defaultProps = {
    className: '',
    isLogged: false,

};
export default React.memo(Admin);
