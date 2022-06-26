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
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [available, setAvailable] = useState([true]);
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [numberPages, setNumberPages] = useState(0);

   async function getReferences () {
    const settings = {
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

    const getFilterState = {
                tags:((!tags[0])?'':tags),
                available: available[0],
                category: (!category[0] && !(category[0]===0))?'':category[0],
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
        reset(){
            setTags([]);
            setAvailable([]);
            setCategory([]);
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getReferences();
        console.log('useEffect',category);
    }, [page,category,tags,available]);

   return (

        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
            <MaterialLibraryMenu
            getFilterState = {getFilterState}
            updateFilterState = {updateFilterState}
            />
            {/* //Ici si allRef présent on rend listOfRef avec allRef sinon on rend avec referencesData  */}
            {displayRef &&
                <div className= "displayReferences">
                    <Pagination
                    page={page}
                    count={numberPages} size="large"
                    showFirstButton showLastButton
                    onChange={handleChange}
                    className="paginate"/>

                    <ListOfReferences
                    currentItems={currentItems}
                    references= {displayRef}
                    />

                    <Pagination
                    page={page}
                    count={numberPages} size="large"
                    showFirstButton showLastButton
                    onChange={handleChange}
                    className="paginate"/>
                </div>
            }
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
