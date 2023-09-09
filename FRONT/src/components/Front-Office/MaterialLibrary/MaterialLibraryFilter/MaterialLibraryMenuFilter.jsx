import React, { forwardRef } from 'react';
import './materiallibrarymenufilter.scss'
import { Box, Paper, TextField } from '@mui/material';
import InputAutocomplete from '../MaterialLibraryComponents/InputAutocomplete/InputAutocomplete';
import InputSwitch from '../MaterialLibraryComponents/InputSwitch/InputSwitch';
import { toast } from 'react-toastify';

// import requests
import api from '../../../../requests/index';

const MaterialLibraryMenuFilter = ({
    className,
    updateFilterState,
    getFilterState,
    categoriesList,
    tagsList,
    handleCloseMenu,
    typeDisplay,
    setRef,
    getReferences
}, ref) => {
    const [articleValue, setArticleValue] = React.useState('');

    const handleSearchByArticleNUmber = async (event) => {
        try {
            setArticleValue(event.target.value);
            if (!event.target.value) {
                getReferences();
            } else {
                const response = await api.get(`/customer/articles/article/${event.target.value}`);
                console.log(response.data);
                if (response.status === 200) {
                    setRef(response.data);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    return (
        <Box className={`materiallibrarymenu-filters ${className}`} ref={ref}>
            <Paper elevation={3} sx={{ borderRadius: '2rem' }} className='materiallibrarymenu-categories'>
                <InputAutocomplete
                    autoComplete={false}
                    clearOnEscape
                    freeSolo
                    handleCloseMenu={handleCloseMenu}
                    currState={getFilterState.categories}
                    updateState={updateFilterState.categories}
                    placeholder='Catégories'
                    eltsList={categoriesList}
                    iconList={true}
                    onChange={(newValue) => {
                        if (newValue) {
                            const findId = categoriesList.find(categoriesList => categoriesList.name === newValue);
                            updateFilterState.categories(findId.id);
                            (handleCloseMenu) && handleCloseMenu();
                        }
                    }
                    }
                />
            </Paper>
            {/* <Paper elevation={3} sx={{borderRadius: '2rem'}}className='materiallibrarymenu-tags'>
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
                        </Paper> */}
            <Box className='materiallibrarymenu-filters-row-flex'>
                <p className='materiallibrarymenu-filters-row-flex-title'>Disponible</p>
                <InputSwitch
                    currState={getFilterState.available}
                    updateState={updateFilterState.available}
                    labelId='available-filter'
                />
            </Box>
            {(typeDisplay !== 'favorites') &&
                <Box className='materiallibrarymenu-filters-row-flex'>
                    <p className='materiallibrarymenu-filters-row-flex-title'>Favoris</p>
                    <InputSwitch
                        currState={getFilterState.favorite}
                        updateState={updateFilterState.favorite}
                        labelId='favorite-filter'
                    />
                </Box>
            }
            <TextField
                id='outlined'
                label="n° d'article"
                name='article_number'
                type='number'
                value={articleValue}
                onChange={handleSearchByArticleNUmber}
                variant='outlined'
                sx={{border: 'none',"& fieldset": { border: 'none' },}}
                className="materiallibrarymenu-categories"
                style={{ width: "150px" }}
            >
            </TextField>
        </Box>
    )
}

export default forwardRef(MaterialLibraryMenuFilter);
