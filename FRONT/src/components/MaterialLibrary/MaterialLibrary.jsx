import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import NextPages from '../NextPages/NextPages';


const MaterialLibrary = ({className, ...rest}) => {
   return (
        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
        <MaterialLibraryMenu/>
            <div classnames= "allReferences">
                <NextPages/>
                <ListOfReferences/>
                <NextPages/>
            </div>
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
