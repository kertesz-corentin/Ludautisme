import React, {useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import api from '../../requests';
import { Button, Slide, Box, Paper, Chip, Menu, Modal, Dialog } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAutocomplete from '../InputAutocomplete/InputAutocomplete'
import MaterialLibraryMenuFilter from '../MaterialLibraryFilter/MaterialLibraryMenuFilter';
import CloseIcon from '@mui/icons-material/Close';

const MaterialLibraryMenu = ({
    className,
    updateFilterState,
    getFilterState,
    removeFilterState,
    style,
     ...rest}) => {

     //Init variables used to create select inputs
     const [categoriesList,setCategoriesList] = useState();
     const [tagsList,setTagsList] = useState();
     const [nameList,setNameList] = useState();

    const initCategories = async () => {
        const response = await api.get('/customer/category/');
        if (response.status === 200) {
            setCategoriesList(response.data.filter(cat=>cat.main));
            setTagsList(response.data.filter(cat=>!cat.main));
        } else {
            console.error(response.data);
        }
    }

    const initNames = async () => {
        const response = await api.get('/customer/articles/namelist');
        if (response.status === 200) {
            setNameList(response.data);
        } else {
            console.error(response.data);
        }
    }

    const handleRemove = (e)=>{
        const dataAttr = e.currentTarget.closest('div').dataset.remove.split("-");
        const type = dataAttr[0];
        const dataId = dataAttr[1];
        removeFilterState[type](dataId);
    }

    const isDesktop = window.matchMedia('(min-width:1080px)').matches;
    const [open, setOpen] = useState(false);
    const handleClickMenu = (event) => {
            setOpen(true);
    };
    const handleCloseMenu = () => {
       setOpen(false);
    };

    const filtersRef = useRef();
    const filtersContainerRef = useRef();

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
        <Box className='materiallibrarymenu-inputs' >
        <Box className='materiallibrarymenu-inputs-container'>
            <Dialog
            className={(isDesktop)?'materiallibrarymenu-inputs-dialog hidden':'materiallibrarymenu-inputs-dialog'}
            onClose={handleCloseMenu} open={open}>
                <Box style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'30px 0 30px'}}>
                <p><strong>Filtres</strong></p>
                <MaterialLibraryMenuFilter
                className={`is--menu`}
                ref={filtersRef}
                updateFilterState={updateFilterState}
                getFilterState={getFilterState}
                removeFilterState={removeFilterState}
                categoriesList={categoriesList}
                tagsList={tagsList}
                nameList={nameList}
                isDesktop = {isDesktop}
                handleCloseMenu = {handleCloseMenu}
                />
                <CloseIcon onClick={handleCloseMenu} sx={{border:'2px solid black',borderRadius:'50%',padding:'3px'}}/>
                </Box>
            </Dialog>
             <Button
                className='is--desktop__button'
                onClick={handleClickMenu}
                >
                    Filtres
            </Button>
                    <MaterialLibraryMenuFilter
                    className='is--desktop'
                ref={filtersRef}
                updateFilterState={updateFilterState}
                getFilterState={getFilterState}
                removeFilterState={removeFilterState}
                categoriesList={categoriesList}
                tagsList={tagsList}
                nameList={nameList}
                isDesktop = {isDesktop}
                />
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
        <Box  ref={filtersContainerRef} style={{width:'100%',display:'block'}}>
          <Slide direction="down"
                 in={(getFilterState.tags.length > 0 || getFilterState.categories.length > 0)}
                 mountOnEnter unmountOnExit
                 container={filtersContainerRef.current}>
                <div className='materiallibrarymenu-filters-container'>
                    <p className='materiallibrarymenu-filters-container__title'>Filtres :</p>
                    <div className='materiallibrarymenu-filters-container-list'>
                                {(categoriesList) &&
                                    categoriesList.map(cat=>(
                                        (getFilterState.categories.includes(cat.id))&&
                                            (<Chip key={`cat-${cat.id}`}data-remove={`categories-${cat.id}`} label={cat.name} variant="outlined" onDelete={handleRemove}/>)
                                    ))
                                }
                                {(tagsList) &&
                                    tagsList.map(tag=>(
                                        (getFilterState.tags.includes(tag.id))&&
                                            (<Chip key={`tag-${tag.id}`} data-remove={`tags-${tag.id}`} label={tag.name} variant="outlined" onDelete={handleRemove}/>)
                                    ))
                                }

                    </div>
                    <Button onClick={updateFilterState.reset}>Reset</Button>
                </div>
            </Slide>
        </Box>
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
