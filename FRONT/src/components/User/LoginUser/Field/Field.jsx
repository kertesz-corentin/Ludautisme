import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './field.scss';

const Field = ({className, ...rest}) => {
   return (
       <div
            className={classnames('field', className)}
            {...rest}
         >

        </div>
   );
};

Field.propTypes = {
    className: PropTypes.string,
};
Field.defaultProps = {
    className: '',
};
export default React.memo(Field);
