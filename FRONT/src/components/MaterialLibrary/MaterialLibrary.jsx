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

    useEffect(() => {
        getAllReferences();
    }, []);

   async function getAllReferences () {

    const settings = {
        page: page,
        limit: limit,
        tags: tags,
        categories: categories,
        available: disponibility,
    }
    const response = await api.post('/customer/articles/search', settings);
        updateDisplayRef(response.data.data, response.data.total.nb_total);
   }

    const [displayRef, setDisplayRef] = useState('');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(12);
    const [tags, updateTags] = React.useState([]);
    const [disponibility, updateDisponibility] = React.useState(['']);
    const [categories, setCategories] = React.useState([]);
    const [numberPages, setNumberPages] = React.useState(0);


    const updateDisplayRef = (refs, total) => {
        console.log(total);
        const number = total;
        const pages = number / limit;
        console.log(pages);
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
    const handleChange = async (event, value) => {
        setPage(value);
        const settings = {
            page: value,
            limit: limit,
            tags: tags,
            categories: categories,
            available: disponibility,
        }
        const response = await api.post('/customer/articles/search', settings);
        if (response.status === 200) {
            updateDisplayRef(response.data.data, response.data.total.nb_total);
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
                    count={numberPages} size="large"
                    showFirstButton showLastButton
                    onChange={handleChange}
                    class="paginate"/>

                    <ListOfReferences
                    currentItems={currentItems}
                    references= {displayRef}
                    />

                    <Pagination
                    page={page}
                    setPage={setPage}
                    count={numberPages} size="large"
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
