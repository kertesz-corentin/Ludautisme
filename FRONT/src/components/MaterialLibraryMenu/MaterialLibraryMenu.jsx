import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelection from '../Select/ChoiceSelection';
import api from '../../requests';


const MaterialLibraryMenu = ({
    className,
    updateFilterState,
    getFilterState,
     ...rest}) => {


     //Init variables used to create select inputs
     const [categoryList,setCategoryList] = useState();
     const [tagsList,setTagsList] = useState();

    const initCategories = async () => {
        const response = await api.get('/customer/category/');
        if (response.status === 200) {
            setCategoryList(response.data.filter(cat=>cat.main));
            setTagsList(response.data.filter(cat=>!cat.main));
        } else {
            console.error(response.data);
        }
    }
    // const dispoList = [
    //     {
    //         id: 1,
    //         name: "disponible",
    //         value: true
    //     },
    //     {
    //         id: 2,
    //         name: "indisponible",
    //         value: false
    //     },
    // ]

    //     const reset = async () => {
    // }


//Define state getting all picked ref from choiceSelection.jsx using fction getAllPicked Ref
    useEffect(()=>{
        initCategories();
    },[]);
   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            <p>Matériathèque</p>
            {/* ChoiceSelection belongs to case named "Select" */}
            <ChoiceSelection
            currState = {getFilterState.category}
            updateState = {updateFilterState.category}
            labelId = 'category-filter'
            displayName = 'Catégories Principales'
            eltsList = {categoryList}
              />
             <ChoiceSelection
            currState = {getFilterState.tags}
            updateState = {updateFilterState.tags}
            labelId = 'tags-filter'
            displayName = 'Tags'
            eltsList = {tagsList}
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
