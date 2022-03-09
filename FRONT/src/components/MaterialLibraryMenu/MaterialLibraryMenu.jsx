import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './materiallibrarymenu.scss';
import ChoiceSelect from '../Select/ChoiceSelect';

const MaterialLibraryMenu = ({className, ...rest}) => {
   return (
       <div
            className={classnames('materiallibrarymenu', className)}
            {...rest}
         >
            Menu de la matériathèque
            <ChoiceSelect/>
            <ChoiceSelect/>
            <ChoiceSelect/>
            <ChoiceSelect/>
            <ChoiceSelect/>

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
