import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrary.scss';
import MaterialLibraryMenu from '../MaterialLibraryMenu/MaterialLibraryMenu';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import api from '../../requests';

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

    const updateDisplayRef = (refs) => {
        setDisplayRef(refs);
    }

   return (

        <div            className={classnames('materiallibrary', className)}
            {...rest}
        >
            <MaterialLibraryMenu updateDisplayRef={updateDisplayRef} />
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
