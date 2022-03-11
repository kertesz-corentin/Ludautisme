import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelection from '../Select/ChoiceSelection';



const MaterialLibraryMenu = ({className,categories, ...rest}) => {

   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            Matériathèque
{/* ChoiceSelection belongs to case named "Select" */}
            <ChoiceSelection categories={categories} />
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
