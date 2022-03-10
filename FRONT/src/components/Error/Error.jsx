import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './error.scss';

const Error = ({className, ...rest}) => {
   return (
       <div
            className={classnames('error', className)}
            {...rest}
         >
            PAGE 404
        </div>
   );
};

Error.propTypes = {
    className: PropTypes.string,
};
Error.defaultProps = {
    className: '',
};
export default React.memo(Error);
