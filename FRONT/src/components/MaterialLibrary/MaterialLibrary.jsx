import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import NextPages from '../NextPages/NextPages';
import api from '../../requests';


const MaterialLibrary = ({className, ...rest}) => {

//Here i define all datas i'll need in materiallibrary, they'll be set by api response

const [articlesData, setArticlesDatas] = useState('')

    useEffect(() => {
        getAllReferences();
        getAllCategories();
    }, []);

   async function getAllReferences () {
        const response = await api.get('/customer/articles');
        console.log(`Voila tout les articles`, response)
   }
   async function oneReference () {
    const response = await api.get('/customer/articles/:id');
    console.log(`Voila l'article demandé`, response)
}

async function getAllCategories () {
    const response = await api.get('/customer/category');
    console.log(`Voila toutes les catégories`, response)
}
   return (
        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
        <MaterialLibraryMenu/>
            <div classnames= "allReferences">
                <NextPages/>
                <ListOfReferences/>
                <NextPages/>
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
