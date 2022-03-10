import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './resetpwd.scss';

const ResetPwd = ({className, ...rest}) => {
   return (
       <div
            className={classnames('resetpwd', className)}
            {...rest}
         >
            reset pwd
        </div>
   );
};

ResetPwd.propTypes = {
    className: PropTypes.string,
};
ResetPwd.defaultProps = {
    className: '',
};
export default React.memo(ResetPwd);
