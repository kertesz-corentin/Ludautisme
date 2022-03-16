import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminLogin from '../Admin/AdminLogin/AdminLogin';
import './admin.scss';

const Admin = ({className, ...rest}) => {
    return (
        <div
            className={classnames('admin', className)}
            {...rest}
        >
            <h1 className="admin-title">Bienvenue sur le portail de connexion administrateur</h1>
            <AdminLogin />
        </div>
    );
};

Admin.propTypes = {
    className: PropTypes.string,
};
Admin.defaultProps = {
    className: '',
};
export default React.memo(Admin);
