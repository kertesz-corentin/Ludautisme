import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';

const MaterialLibraryMenu = ({className, ...rest}) => {
   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            Menu de la matériathèque
        </div>
   );
};

MaterialLibraryMenu.propTypes = {
    className: PropTypes.string,
};
MaterialLibraryMenu.defaultProps = {
    className: '',
};
export default React.memo(MaterialLibraryMenu);
