import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuAdmin from './MenuAdmin/MenuAdmin';
import LoginAdmin from './LoginAdmin/LoginAdmin';
import './admin.scss';

const Admin = ({isLogged, className, ...rest}) => {
   return (
       <div
            className={classnames('admin', className)}
            {...rest}
         >
        {!isLogged && (
            <LoginAdmin />
        )}

        {isLogged && (
            <MenuAdmin />
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
