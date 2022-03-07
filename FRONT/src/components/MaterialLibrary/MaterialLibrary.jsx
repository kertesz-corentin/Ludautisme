import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materialLibrary.scss';

const MaterialLibrary = ({className, ...rest}) => {
   return (
       <div            className={classnames('library', className)}
            {...rest}
         >
library
        </div>
   );
};

MaterialLibrary.propTypes = {
    className: PropTypes.string,
};
MaterialLibrary.defaultProps = {
    className: '',
};
export default React.memo(MaterialLibrary);
