import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import InputSelect from '../InputSelect/InputSelect';
import InputToggle from '../InputToggle/InputToggle';
import api from '../../requests';
import { Button, Container } from '@mui/material';


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

//Define state getting all picked ref from InputSelect.jsx using fction getAllPicked Ref
    useEffect(()=>{
        initCategories();
    },[]);
   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            <h2 className='materiallibrarymenu-title'>Matériathèque</h2>

            <InputSelect
            currState = {getFilterState.category}
            updateState = {updateFilterState.category}
            labelId = 'category-filter'
            displayName = 'Catégories Principales'
            eltsList = {categoryList}
              />
             <InputSelect
            currState = {getFilterState.tags}
            updateState = {updateFilterState.tags}
            labelId = 'tags-filter'
            displayName = 'Tags'
            eltsList = {tagsList}
              />
            <div className='materiallibrarymenu-row-flex'>
                <p>Disponible</p>
              <InputToggle
               currState = {getFilterState.available}
                updateState = {updateFilterState.available}
                labelId = 'available-filter'
                eltsList = {tagsList}
              />
            </div>
            <Button onClick={updateFilterState.reset}>Reset</Button>
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
