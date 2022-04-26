import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import NextPages from '../NextPages/NextPages';
import api from '../../requests';
import Loader from '../Loader/Loader';




const MaterialLibrary = ({className,currentItems, ...rest}) => {
//Here i define all datas i'll need in materiallibrary, they'll be set by api response

const [referencesData, setReferencesDatas] = useState('')
const [categoriesData, setCategoriesDatas] = useState('')




    useEffect(() => {
        getAllReferences();
        getAllCategories();
    }, []);

   async function getAllReferences () {
        const response = await api.get('/customer/articles');
        setDisplayRef(response.data);
   }
   async function oneReference () {
    const response = await api.get('/customer/articles/:id');
    console.log(`Voila l'article demandé`, response)
   }

    async function getAllCategories () {
        const response = await api.get('/customer/category');
        setCategoriesDatas(response.data)
    }

    const [displayRef, setDisplayRef] = useState('');

    const updateDisplayRef = (refs) => {
        setDisplayRef(refs);
    }

   return (

        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
            <MaterialLibraryMenu updateDisplayRef={updateDisplayRef} categories={categoriesData} />
            {/* //Ici si allRef présent on rend listOfRef avec allRef sinon on rend avec referencesData, ca donne :  */}
            {displayRef &&
                <div className= "displayReferences">
                    <ListOfReferences currentItems={currentItems} references= {displayRef}/>
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
