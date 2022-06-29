import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import api from '../../requests';
import Pagination from '@mui/material/Pagination';

const MaterialLibrary = ({className,currentItems, ...rest}) => {
//Here i define all datas i'll need in materiallibrary, they'll be set by api response
    const [displayRef, setDisplayRef] = useState('');
    const [ids, setIds] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [available, setAvailable] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [numberPages, setNumberPages] = useState(0);


   async function getReferences () {
    const settings = {
        id:ids,
        page: page,
        limit: limit,
        tags: tags,
        categories: (Array.isArray(categories))?categories:[categories],
        available: available,
    }
    const references = await api.post('/customer/articles/search', settings);
    const countRef = (references.data.length)&&references.data[0].countresult;
    updateDisplayRef(references.data,countRef);
   }

   // Carrefull this function is send to ListOfReferences
    const updateDisplayRef = (refs,countRef) => {
        const pages = countRef / limit;
        if(pages !== numberPages){
            setNumberPages(Math.ceil(pages));
        }
        setDisplayRef(refs);
    }

    //Remainder Need to put these 3 functions below in Redux
    const getFilterState = {
                tags:((!tags[0])?'':tags),
                available: available[0],
                categories: (!categories.length)?'':categories,
                name : ((!ids[0])?'':ids),
    }

    const updateFilterState = {
        tags(newValue){
            (newValue && !tags.includes(newValue)) && setTags([...tags, ...[newValue]]);
        },
        available(newValue){
            setAvailable((newValue)?[newValue]:[]);
        },
        categories(newValue){
            (typeof newValue !== 'undefined' && !categories.includes(newValue)) && setCategories([...categories, newValue]);
        },
        name(newValue){
            setIds(newValue);
        },
        reset(){
            setTags([]);
            setAvailable([]);
            setCategories([]);
            setIds([]);
        }
    }

    const removeFilterState = {
        tags(value){
            const removed = tags.filter(tag=> tag !== Number(value));
            setTags(removed);
        },
        categories(value){
            const removed = categories.filter(cat=> cat !== Number(value));
            setCategories(removed);
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getReferences();
    }, [page,categories,tags,available,ids]);

   return (

        <div     className={classnames('materiallibrary content-container--max-width')}
            {...rest}
        >
            <MaterialLibraryMenu
            getFilterState = {getFilterState}
            updateFilterState = {updateFilterState}
            removeFilterState = {removeFilterState}
            />
            {/* //Ici si allRef présent on rend listOfRef avec allRef sinon on rend avec referencesData  */}
                <div className= "displayReferences">
                    <Pagination
                    page={page}
                    count={numberPages} size="large"
                    showFirstButton showLastButton
                    onChange={handleChange}
                    className={`paginate ${(!displayRef.length || numberPages < 2)? 'hidden':''}`}
                    />

                    <ListOfReferences
                    className='displayReferences-grid'
                    currentItems={currentItems}
                    references= {displayRef}
                    />

                    <Pagination
                    page={page}
                    count={numberPages} size="large"
                    showFirstButton showLastButton
                    onChange={handleChange}
                    className={`paginate ${(!displayRef.length || numberPages < 2)? 'hidden':''}`}/>
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
