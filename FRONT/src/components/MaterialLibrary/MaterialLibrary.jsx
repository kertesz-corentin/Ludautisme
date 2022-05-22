import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import api from '../../requests';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const MaterialLibrary = ({className,currentItems, ...rest}) => {
//Here i define all datas i'll need in materiallibrary, they'll be set by api response

    useEffect(() => {
        getAllReferences();
    }, []);

   async function getAllReferences () {
        const response = await api.get('/customer/articles');
        setDisplayRef(response.data);
   }

    const [displayRef, setDisplayRef] = useState('');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [tags, updateTags] = React.useState([]);
    const [disponibility, updateDisponibility] = React.useState(['']);
    const [categories, setCategories] = React.useState([]);

    const updateDisplayRef = (refs) => {
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
        console.log(value);
        const settings = {
            page: value,
            limit: limit,
            tags: tags,
            categories: categories,
            available: disponibility,
        }
        const response = api.post('/customer/articles/search', settings);
        console.log(settings)
        if (response.status === 200) {
            updateDisplayRef(response.data);
        } else {
            console.error(response.data);
        }
    };

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
            {/* //Ici si allRef présent on rend listOfRef avec allRef sinon on rend avec referencesData, ca donne :  */}
            {displayRef &&
                <div className= "displayReferences">
                    <Pagination
                    page={page}
                    setPage={setPage}
                    count={10} size="large"
                    showFirstButton showLastButton
                    onChange={handleChange} class="paginate"/>

                    <ListOfReferences
                    currentItems={currentItems}
                    references= {displayRef}
                    />

                    <Pagination
                    page={page}
                    setPage={setPage}
                    count={10} size="large"
                    showFirstButton showLastButton
                    onChange={handleChange} class="paginate"/>
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
