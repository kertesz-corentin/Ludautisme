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
            <p>Matériathèque</p>
            <Button onClick={updateFilterState.reset}>Reset</Button>

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
              <Container>
                <span>Disponible</span>
              <InputToggle
               currState = {getFilterState.available}
                updateState = {updateFilterState.available}
                labelId = 'tags-filter'
                displayName = 'Tags'
                eltsList = {tagsList}
              />
              </Container>
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
