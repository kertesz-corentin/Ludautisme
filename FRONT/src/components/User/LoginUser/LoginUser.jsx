import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './loginuser.scss';

const LoginUser = ({className, ...rest}) => {
   return (
       <div
            className={classnames('loginuser', className)}
            {...rest}
         >

        </div>
   );
};

LoginUser.propTypes = {
    className: PropTypes.string,
};
LoginUser.defaultProps = {
    className: '',
};
export default React.memo(LoginUser);
