import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import api from '../../../../requests';
import MaterialLibrary from '../../MaterialLibrary/MaterialLibrary';


const UserFavorite = ({className, currentItems, ...rest}) => {

    return(
        <div>
            <MaterialLibrary
              currentItems={currentItems}
              typeDisplay='favorites'
            />
        </div>      
    )
};

UserFavorite.propTypes = {
    className: PropTypes.string,
};
UserFavorite.defaultProps = {
    className: '',
};
export default React.memo(UserFavorite);
