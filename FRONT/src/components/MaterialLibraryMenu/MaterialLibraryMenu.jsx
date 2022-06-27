import React, {useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import InputSelect from '../InputSelect/InputSelect';
import InputSwitch from '../InputSwitch/InputSwitch';
import api from '../../requests';
import { Button, Slide, Box, Autocomplete,TextField, Paper, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAutocomplete from '../InputAutocomplete/InputAutocomplete'


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

    const handleRemove = (e)=>{
        const dataId = Number(e.currentTarget.closest('div').dataset.remove);
        removeFilterState.tags(dataId);
    }

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
                <Box className='materiallibrarymenu-filters'>
                    <Paper elevation={3} sx={{borderRadius: '2rem'}}className='materiallibrarymenu-categories'>
                        <InputAutocomplete
                            autoComplete={false}
                            clearOnEscape
                            freeSolo
                            currState = {getFilterState.category}
                            updateState = {updateFilterState.category}
                            placeholder= 'Catégories'
                            eltsList = {categoryList}
                            onChange = {(newValue) => {
                                    if (newValue) {
                                        const findId = tagsList.find(categoryList=>categoryList.name === newValue);
                                        updateFilterState.category(findId.id);
                                    }
                                }
                            }
                        />
                    </Paper>
                    <Paper elevation={3} sx={{borderRadius: '2rem'}}className='materiallibrarymenu-tags'>
                        <InputAutocomplete
                            autoComplete
                            clearOnEscape
                            freeSolo
                            currState = {getFilterState.tags}
                            updateState = {updateFilterState.tags}
                            placeholder= 'Tags'
                            eltsList = {tagsList}
                            onChange = {(newValue) => {
                                    if (newValue) {
                                        const findId = tagsList.find(tag=>tag.name === newValue);
                                        updateFilterState.tags(findId.id);
                                    }
                                }
                            }
                        />
                    </Paper>
                    <Box className='materiallibrarymenu-row-flex'>
                        <p className='materiallibrarymenu-row-flex-title'>Disponible</p>
                    <InputSwitch
                        currState = {getFilterState.available}
                        updateState = {updateFilterState.available}
                        labelId = 'available-filter'
                        eltsList = {tagsList}
                    />
                    </Box>
                </Box>
                <Paper elevation={3} sx={{borderRadius: '2rem'}} className='materiallibrarymenu-searchbar'>
                    <SearchIcon/>
                    <InputAutocomplete
                        autoComplete
                        clearOnEscape
                        freeSolo
                        currState = {getFilterState.name}
                        updateState = {updateFilterState.name}
                        placeholder= 'Rechercher'
                        eltsList = {nameList}
                        onChange = {(newValue) => {
                                const pattern = newValue.split(" ").map(word=>`(?=.*${word})`).join("");
                                const regex = new RegExp(pattern,'i');
                                const found = nameList.filter((tag)=>tag.name.match(regex));
                                return found.map( elt=> Number(elt.id) );
                            }
                        }
                    />
                </Paper>
        </Box>
        <div className='materiallibrarymenu-filters'>
            <p>Filtres :</p>
            <div className='materiallibrarymenu-filters-list'>
                        {(tagsList) &&
                            tagsList.map(tag=>(
                                (getFilterState.tags.includes(tag.id))&&
                                    (<Chip data-remove={tag.id} label={tag.name} variant="outlined" onDelete={handleRemove}/>)
                            ))
                        }

            </div>
            <Button onClick={updateFilterState.reset}>Reset</Button>
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
