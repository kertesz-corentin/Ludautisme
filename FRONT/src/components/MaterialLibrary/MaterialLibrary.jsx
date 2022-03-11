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
        console.log(`Voila toute les references`, response);
        setReferencesDatas(response.data)
        console.log('Voila les données à passer en props', referencesData)
   }
   async function oneReference () {
    const response = await api.get('/customer/articles/:id');
    console.log(`Voila l'article demandé`, response)
   }

    async function getAllCategories () {
        const response = await api.get('/customer/category');
        console.log(`Voila toutes les catégories`, response);
        setCategoriesDatas(response.data)
        console.log('Voila les données à passer en props', categoriesData)
    }
   return (
       categoriesData && referencesData ?
        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
        <MaterialLibraryMenu categories={categoriesData} />
            <div classnames= "allReferences">
                <NextPages/>
                <ListOfReferences references= {referencesData}/>
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
