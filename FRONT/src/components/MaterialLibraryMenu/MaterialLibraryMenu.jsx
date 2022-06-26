import React, {useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import InputSelect from '../InputSelect/InputSelect';
import InputSwitch from '../InputSwitch/InputSwitch';
import api from '../../requests';
import { Button, Slide, Box, Autocomplete,TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const MaterialLibraryMenu = ({
    className,
    updateFilterState,
    getFilterState,
    removeFilterState,
     ...rest}) => {

     //Init variables used to create select inputs
     const [categoryList,setCategoryList] = useState();
     const [tagsList,setTagsList] = useState();
     const [nameList,setNameList] = useState();
     const [searchReset,setSearchReset] = useState(false);

    const initCategories = async () => {
        const response = await api.get('/customer/category/');
        if (response.status === 200) {
            setCategoryList(response.data.filter(cat=>cat.main));
            setTagsList(response.data.filter(cat=>!cat.main));
        } else {
            console.error(response.data);
        }
    }

    const initNames = async () => {
        console.log("requete")
        const response = await api.get('/customer/articles/namelist');
        if (response.status === 200) {
            setNameList(response.data);
        } else {
            console.error(response.data);
        }
    }
    const resetSearchValue = ()=>setSearchReset(!searchReset);

    //Optimisation : Need to bee trigered on focus input, not on loading.
    useEffect(()=>{
        initCategories();
        initNames();
    },[]);
   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
        <Box className='materiallibrarymenu-inputs'>
                <InputSelect
                currState = {getFilterState.category}
                updateState = {updateFilterState.category}
                labelId = 'category-filter'
                displayName = 'Catégories Principales'
                eltsList = {categoryList}
                />
                <div className='searchbar'>
                <Autocomplete
                    className='searchbar-autocomplete'
                   value={getFilterState.tags.name}
                    options={(tagsList)?tagsList.map(elt=>elt.name):[]}
                    onChange={(event,newValue)=>{
                        if (newValue) {
                        const findId = tagsList.find(tag=>tag.name === newValue);
                        updateFilterState.tags(findId.id);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField {...params}
                        className='searchbar-autocomplete-textfield'
                        variant="standard" />
                    )}
                />
                </div>
                <Autocomplete
                    className='materiallibrarymenu-filter-tag'

                    value={getFilterState.tags.name}
                    options={(tagsList)?tagsList.map(elt=>elt.name):[]}
                    onChange={(event,newValue)=>{
                        if (newValue) {
                        const findId = tagsList.find(tag=>tag.name === newValue);
                        updateFilterState.tags(findId.id);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField {...params}
                        className='searchbar-autocomplete-textfield'
                        variant="standard" />
                    )}
                />
                <div className='materiallibrarymenu-row-flex'>
                    <p>Disponible</p>
                <InputSwitch
                    currState = {getFilterState.available}
                    updateState = {updateFilterState.available}
                    labelId = 'available-filter'
                    eltsList = {tagsList}
                />
                </div>
            <Button onClick={updateFilterState.reset}>Reset</Button>
            <div className='searchbar'>
            <SearchIcon/>
                <Autocomplete
                    autoComplete
                    clearOnEscape
                    freeSolo
                    limitTags={20}
                    className='searchbar-autocomplete'
                    key={searchReset}
                    value={''}
                    options={(nameList)?nameList.map(elt=>elt.name):[]}
                    onClose={resetSearchValue}
                    onChange={(event,newValue)=>{
                        if (newValue) {
                            const pattern = newValue.split(" ").map(word=>`(?=.*${word})`).join("");
                            const regex = new RegExp(pattern,'i');
                            const found = nameList.filter((tag)=>tag.name.match(regex))

                            updateFilterState.name(found.map( elt=> Number(elt.id) ));
                        }
                    }}
                    renderInput={(params) => (
                        <TextField {...params}
                        className='searchbar-autocomplete-textfield'
                        variant="standard" />
                    )}
                />
            </div>
        </Box>
        <div className='materiallibrarymenu-filters'>
            <p>Filtres :</p>
            <div className='materiallibrarymenu-filters-list'></div>
        </div>
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
