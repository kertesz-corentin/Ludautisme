import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelection from '../Select/ChoiceSelection';



const MaterialLibraryMenu = ({className, ...rest}) => {

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
