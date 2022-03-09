import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './reference.scss';

const Reference = ({className, ...rest}) => {
   return (
       <div
            className={classnames('reference', className)}
            {...rest}
         >
            Voici une reference
        </div>
   );
};

Reference.propTypes = {
    className: PropTypes.string,
};
Reference.defaultProps = {
    className: '',
};
export default React.memo(Reference);
