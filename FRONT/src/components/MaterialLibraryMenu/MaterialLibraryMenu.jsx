import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelection from '../Select/ChoiceSelection';
import { Typography } from '@mui/material';



const MaterialLibraryMenu = ({
    className,
    categories,
    getAllRef,
     ...rest}) => {



//Define state getting all picked ref from choiceSelection.jsx using fction getAllPicked Ref
    const [allPickedRef, setAllPickedRef] = useState('')

    function getAllPickedRef(response){
        setAllPickedRef(response)
        getAllRef(response)
    }

   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            Matériathèque
{/* ChoiceSelection belongs to case named "Select" */}
            <ChoiceSelection getAllPickedRef= {getAllPickedRef} categories={categories} />
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
