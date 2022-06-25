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
    const [tags, updateTags] = useState([]);
    const [disponibility, updateDisponibility] = useState(['']);
    const [categories, setCategories] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [countRef,setCountRef] = useState();

   async function getReferencesByPage () {
    const settings = {
        page: page,
        limit: limit,
        tags: tags,
        categories: categories,
        available: disponibility,
    }
    const references = await api.post('/customer/articles/search', settings);
    if (!countRef) {
        const getCountRef = await api.get('/customer/articles/total');
        const count = Number(getCountRef.data[0].nb_total);
        setCountRef(count);
        updateDisplayRef(references.data,count);
        return
    };
        updateDisplayRef(references.data);
   }

    const updateDisplayRef = (refs,initCount) => {
        const pages = (initCount) ? initCount / limit : countRef / limit;
        setNumberPages(Math.ceil(pages));
        setDisplayRef(refs);
    }
    const setTags = (tags) => {
        updateTags(tags);
    }
    const setDisponibility = (disponibility) => {
        updateDisponibility(disponibility);
    }
    const updateCategories = (categories) => {
         setCategories(categories);
     }
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getReferencesByPage();
    }, [page]);


   return (

        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
            <MaterialLibraryMenu
            updateDisplayRef={updateDisplayRef}
            setTags={setTags}
            setDisponibility={setDisponibility}
            setCategories={updateCategories}
            page={page}
            limit={limit}
            tags={tags}
            disponibility={disponibility}
            categories={categories}
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
