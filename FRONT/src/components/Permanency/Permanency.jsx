import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './permanency.scss';

const Permanency = ({className, ...rest}) => {
   return (
       <div
            className={classnames('permanency', className)}
            {...rest}
         >
            Permanency
        </div>
   );
};

Permanency.propTypes = {
    className: PropTypes.string,
};
Permanency.defaultProps = {
    className: '',
};
export default React.memo(Permanency);
