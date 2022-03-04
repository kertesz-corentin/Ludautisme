import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './library.scss';

const Library = ({className, ...rest}) => {
   return (
       <div            className={classnames('library', className)}
            {...rest}
         >
library
        </div>
   );
};

Library.propTypes = {
    className: PropTypes.string,
};
Library.defaultProps = {
    className: '',
};
export default React.memo(Library);
