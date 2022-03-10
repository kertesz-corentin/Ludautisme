import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelection from '../Select/ChoiceSelection';
import api from '../../requests';


const MaterialLibraryMenu = ({className, ...rest}) => {
    useEffect(() => {
        getAllReferences();
    }, []);

   async function getAllReferences () {
        const response = await api.get('/user/articles');
        console.log(`Voila tout les articles`, response)
   }
   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            Matériathèque
            <ChoiceSelection/>
        </div>
   );
};

MaterialLibraryMenu.propTypes = {
    className: PropTypes.string,
};
MaterialLibraryMenu.defaultProps = {
    className: '',
};
export default React.memo(MaterialLibraryMenu);
