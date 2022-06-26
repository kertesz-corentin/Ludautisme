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
    const [available, setAvailable] = useState([true]);
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [numberPages, setNumberPages] = useState(0);

   async function getReferences () {
    const settings = {
        id:ids,
        page: page,
        limit: limit,
        tags: tags,
        categories: (Array.isArray(category))?category:[category],
        available: available,
    }
    console.log(settings)
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
        console.log(refs);
        setDisplayRef(refs);
    }

    //Remainder Need to put these 3 functions below in Redux
    const getFilterState = {
                tags:((!tags[0])?'':tags),
                available: available[0],
                category: (!category[0] && !(category[0]===0))?'':category[0],
                name : ((!ids[0])?'':ids),
    }

    const updateFilterState = {
        tags(newValue){
            setTags((!tags.length) ? [newValue] : [...tags,Number(newValue)]);
        },
        available(newValue){
            setAvailable([newValue]);
        },
        category(newValue){
            setCategory([newValue]);
        },
        name(newValue){
            setIds(newValue);
        },
        reset(){
            setTags([]);
            setAvailable([]);
            setCategory([]);
            setIds([]);
        }
    }

    const removeFilterState = {
        tags(value){
            const index = tags.findIndex(tag=>tag.id === value);
            setTags([...tags.splice(index,1)]);
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getReferences();
        console.log('useEffect',category);
    }, [page,category,tags,available,ids]);

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
