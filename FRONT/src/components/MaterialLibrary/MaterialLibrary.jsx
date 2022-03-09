import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materialLibrary.scss';
import Permanency from '../Permanency/Permanency';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';


const MaterialLibrary = ({className, ...rest}) => {
   return (
       <div            className={classnames('library', className)}
            {...rest}
         >
            <Permanency />
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
