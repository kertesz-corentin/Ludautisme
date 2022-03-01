import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminMenu from '../AdminMenu/AdminMenu';
import './adminhome.scss';

const AdminHome = ({className, ...rest}) => {
   return (
       <div
            className={classnames('adminhome', className)}
            {...rest}
         >
        <AdminMenu />

        </div>
   );
};

AdminHome.propTypes = {
    className: PropTypes.string,
};
AdminHome.defaultProps = {
    className: '',
};
export default React.memo(AdminHome);
