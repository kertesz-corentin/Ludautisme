import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './loginadmin.scss';

const LoginAdmin = ({className, ...rest}) => {
   return (
       <div
            className={classnames('loginadmin', className)}
            {...rest}
         >

        </div>
   );
};

LoginAdmin.propTypes = {
    className: PropTypes.string,
};
LoginAdmin.defaultProps = {
    className: '',
};
export default React.memo(LoginAdmin);
