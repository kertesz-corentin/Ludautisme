import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from './MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from './MaterialLibraryComponents/ListsOfReferences/ListOfReferences';
import api from '../../../requests';
import { Pagination, TablePagination } from '@mui/material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

const MaterialLibrary = ({ className,
    currentItems,
    typeDisplay,
    ...rest }) => {
    //Here i define all datas i'll need in materiallibrary, they'll be set by api response
    const [displayRef, setDisplayRef] = useState([]);
    const [countRef, setCountRef] = useState(0);
    const [ids, setIds] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [available, setAvailable] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [favorite, setFavorite] = useState();

    const [gridSize, setGridSize] = useState(400);
    const [isLoading, setIsLoading] = useState(true);


    const [currentSearchValue, setCurrentSearchValue] = useState();

    async function getReferences() {
        setIsLoading(true);
        const settings = {
            id: ids,
            page: page,
            tags: tags,
            categories: (Array.isArray(categories)) ? categories : [categories],
            available: available,
            favorite: favorite,
        }
        if (typeDisplay === 'favorites') {
            settings.favorite = [true];
        }
        settings.limit = (limit !== -1) ? limit : null;
        let references = await api.post('/customer/articles/search', settings);
                setDisplayRef(references.data);
        if (references.data[0]) {
            setCountRef(Number(references.data[0].countresult));
            const pages = references.data[0].countresult / limit;
            if (pages !== numberPages) {
                setNumberPages(Math.ceil(pages));
            }
        }
        setIsLoading(false);    // updateDisplayRef();
    }
    function setRef(refs) {
        setDisplayRef(refs);
    }

    //Remainder Need to put these 3 functions below in Redux
    const getFilterState = {
        tags: ((!tags[0]) ? '' : tags),
        available: available[0],
        categories: (!categories.length) ? '' : categories,
        name: ((!ids[0]) ? '' : ids),
        searchValue: currentSearchValue,
        favorite,
    }

    const updateFilterState = {
        tags(newValue) {
            (newValue && !tags.includes(newValue)) && setTags([...tags, ...[newValue]]);
        },
        available(newValue) {
            setAvailable((newValue) ? [newValue] : []);
        },
        categories(newValue) {
            (typeof newValue !== 'undefined' && !categories.includes(newValue)) && setCategories([...categories, newValue]);
        },
        name(newValue) {
            setIds(newValue.ids);
            setCurrentSearchValue(newValue.searchValue);
        },
        favorite(newValue) {
            setFavorite(!favorite);
        },
        reset() {
            setTags([]);
            setAvailable([]);
            setCategories([]);
            setIds([]);
            setCurrentSearchValue();
        }
    }

    const removeFilterState = {
        tags(value) {
            const removed = tags.filter(tag => tag !== Number(value));
            setTags(removed);
        },
        categories(value) {
            const removed = categories.filter(cat => cat !== Number(value));
            setCategories(removed);
        },
        available() {
            setAvailable(false);
        },
        favorite() {
            setFavorite(false);
        },
        searchValue() {
            setIds([]);
            setCurrentSearchValue();
        }
    }

    const handleChangeSimplePagination = (event, value) => {
        setPage(value);
    };

    const handleChangeTablePagination = (event, value) => {
        setPage(value + 1);
    };

    const handleRowPerPageChange = (e) => {
        (e.target.value !== "Tout") ? setLimit(e.target.value) : setLimit(-1);
        setPage(1);
    }

    const handleGridSizeChange = (e) => {
        const iconType = e.target.closest('svg').getAttribute('data-testid');
        (iconType)
            ? (iconType === 'ViewComfyIcon') ? setGridSize(250) : setGridSize(400)
            :
            setGridSize(400);
    }


    useEffect(() => {
        getReferences();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags, ids, categories, available, page, limit, favorite]);


    return (

        <div className={classnames('materiallibrary content-container--max-width')}
            {...rest}
        >
            <MaterialLibraryMenu
                getFilterState={getFilterState}
                updateFilterState={updateFilterState}
                removeFilterState={removeFilterState}
                typeDisplay={typeDisplay}
                setRef={setRef}
                getReferences={getReferences}
            />
            {/* //Ici si allRef présent on rend listOfRef avec allRef sinon on rend avec referencesData  */}
            <div className="displayReferences">
                <div className="displayReferences__grid-settings">
                    <div className="displayReferences__grid-settings--size">
                        <ViewComfyIcon onClick={handleGridSizeChange} />
                        <GridViewRoundedIcon onClick={handleGridSizeChange} />
                        {/*For list display, not implemented <TableRowsIcon/> */}
                    </div>
                    <div className="displayReferences__grid-settings--table-paginate">
                        <TablePagination
                            component="div"
                            labelRowsPerPage='Articles par page :'
                            count={countRef}
                            page={page - 1}
                            onPageChange={handleChangeTablePagination}
                            rowsPerPage={limit}
                            rowsPerPageOptions={[10, 25, 50, 100, 250]}
                            onRowsPerPageChange={handleRowPerPageChange}
                        />
                    </div>
                </div>

                <ListOfReferences
                    className='displayReferences-grid'
                    currentItems={currentItems}
                    references={displayRef}
                    gridSize={gridSize}
                    isLoading={isLoading}
                />

                <Pagination
                    page={page}
                    count={numberPages} size="large"
                    showFirstButton showLastButton
                    onChange={handleChangeSimplePagination}
                    className={`paginate ${(!displayRef.length || numberPages < 2) ? 'hidden' : ''}`} />
            </div>
        </div>

    );
};

MaterialLibrary.propTypes = {
    className: PropTypes.string,
};
MaterialLibrary.defaultProps = {
    className: '',
};
export default React.memo(MaterialLibrary);
