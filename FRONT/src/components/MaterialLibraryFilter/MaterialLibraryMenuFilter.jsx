import React, {forwardRef} from 'react';
import './materiallibrarymenufilter.scss'
import { Box, Paper } from '@mui/material';
import InputAutocomplete from '../InputAutocomplete/InputAutocomplete';
import InputSwitch from '../InputSwitch/InputSwitch';


const MaterialLibraryMenuFilter = ({
    className,
    updateFilterState,
    getFilterState,
    categoriesList,
    tagsList,
    handleCloseMenu,
    typeDisplay,
    },ref)=>{
    return (
         <Box className={`materiallibrarymenu-filters ${className}`} ref={ref}>
                        <Paper elevation={3} sx={{borderRadius: '2rem'}}className='materiallibrarymenu-categories'>
                            <InputAutocomplete
                                autoComplete={false}
                                clearOnEscape
                                freeSolo
                                handleCloseMenu = {handleCloseMenu}
                                currState = {getFilterState.categories}
                                updateState = {updateFilterState.categories}
                                placeholder= 'Catégories'
                                eltsList = {categoriesList}
                                iconList = {true}
                                onChange = {(newValue) => {
                                        if (newValue) {
                                            const findId = categoriesList.find(categoriesList=>categoriesList.name === newValue);
                                            updateFilterState.categories(findId.id);
                                            (handleCloseMenu)&&handleCloseMenu();
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
                                handleCloseMenu = {handleCloseMenu}
                                currState = {getFilterState.tags}
                                updateState = {updateFilterState.tags}
                                placeholder= 'Tags'
                                eltsList = {tagsList}
                                iconList = {true}
                                onChange = {(newValue) => {
                                        if (newValue) {
                                            const findId = tagsList.find(tag=>tag.name === newValue);
                                            updateFilterState.tags(findId.id);
                                            (handleCloseMenu)&&handleCloseMenu();
                                        }
                                    }
                                }
                            />
                        </Paper>
                        <Box className='materiallibrarymenu-filters-row-flex'>
                            <p className='materiallibrarymenu-filters-row-flex-title'>Disponible</p>
                        <InputSwitch
                            currState = {getFilterState.available}
                            updateState = {updateFilterState.available}
                            labelId = 'available-filter'
                        />
                        </Box>
                        {(typeDisplay !== 'favorites') &&
                            <Box className='materiallibrarymenu-filters-row-flex'>
                                <p className='materiallibrarymenu-filters-row-flex-title'>Favoris</p>
                            <InputSwitch
                                currState = {getFilterState.favorite}
                                updateState = {updateFilterState.favorite}
                                labelId = 'favorite-filter'
                            />
                            </Box>
                        }
                         
                    </Box>
    )
}

export default forwardRef(MaterialLibraryMenuFilter);
