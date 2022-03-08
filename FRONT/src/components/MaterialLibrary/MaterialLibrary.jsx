import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materialLibrary.scss';
import Permanency from '../Permanency/Permanency';

const MaterialLibrary = ({className, ...rest}) => {
   return (
       <div            className={classnames('library', className)}
            {...rest}
         >
             <div>
            <Permanency /></div>
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
