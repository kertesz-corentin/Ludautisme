import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelection from '../Select/ChoiceSelection';



const MaterialLibraryMenu = ({
    className,
    page,
    limit,
    tags,
    setTags,
    updateDisplayRef,
    disponibility,
    setDisponibility,
    categories,
    setCategories,
     ...rest}) => {



//Define state getting all picked ref from choiceSelection.jsx using fction getAllPicked Ref

   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            <p>Matériathèque</p>
{/* ChoiceSelection belongs to case named "Select" */}
            <ChoiceSelection
            updateDisplayRef= {updateDisplayRef}
            page={page}
            limit={limit}
            tags={tags}
            setTags={setTags}
            disponibility={disponibility}
            setDisponibility={setDisponibility}
            categories={categories}
            setCategories={setCategories}
              />
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
