import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelection from '../Select/ChoiceSelection';



const MaterialLibraryMenu = ({
    className,
    categories,
    updateDisplayRef,
     ...rest}) => {



//Define state getting all picked ref from choiceSelection.jsx using fction getAllPicked Ref

   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            <p>Matériathèque</p>
{/* ChoiceSelection belongs to case named "Select" */}
            <ChoiceSelection updateDisplayRef= {updateDisplayRef}  />
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
