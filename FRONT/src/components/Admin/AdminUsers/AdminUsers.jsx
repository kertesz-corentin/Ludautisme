import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import './adminusers.scss';

const AdminUsers = ({className, ...rest}) => {
   return (
       <div
            className={classnames('adminusers', className)}
            {...rest}
         >
            <AdminSection title="Adhérent" />
        </div>
   );
};

AdminUsers.propTypes = {
    className: PropTypes.string,
};
AdminUsers.defaultProps = {
    className: '',
};
export default React.memo(AdminUsers);
