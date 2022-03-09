import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';


const MaterialLibrary = ({className, ...rest}) => {
   return (
        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
        <MaterialLibraryMenu/>
        <ListOfReferences/>
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
