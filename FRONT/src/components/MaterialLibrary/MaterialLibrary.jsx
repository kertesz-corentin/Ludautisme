import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import NextPages from '../NextPages/NextPages';
import api from '../../requests';
import Loader from '../Loader/Loader';




const MaterialLibrary = ({className, ...rest}) => {

//Here i define all datas i'll need in materiallibrary, they'll be set by api response

const [referencesData, setReferencesDatas] = useState('')
const [categoriesData, setCategoriesDatas] = useState('')




    useEffect(() => {
        getAllReferences();
        getAllCategories();
    }, []);

   async function getAllReferences () {
        const response = await api.get('/customer/articles');
        setReferencesDatas(response.data)
   }
   async function oneReference () {
    const response = await api.get('/customer/articles/:id');
    console.log(`Voila l'article demandé`, response)
   }

    async function getAllCategories () {
        const response = await api.get('/customer/category');
        setCategoriesDatas(response.data)
    }

    const [allRef, setAllRef] = useState('');

    function getAllRef(response){
        setAllRef(response)
    }
    console.log(`MES DONEES IN ML `, allRef)
   return (


       categoriesData && referencesData ?
        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
        <MaterialLibraryMenu getAllRef={getAllRef} categories={categoriesData} />
            <div className= "allReferences">
                <NextPages/>
                {!allRef ?
                <ListOfReferences references= {referencesData}/>
                :
                <ListOfReferences references= {allRef}/>
                }
                <NextPages/>
            </div>
        </div>

        :
        <Loader/>

   );
};

MaterialLibrary.propTypes = {
    className: PropTypes.string,
};
MaterialLibrary.defaultProps = {
    className: '',
};
export default React.memo(MaterialLibrary);
