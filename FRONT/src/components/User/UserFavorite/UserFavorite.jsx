import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import api from '../../../requests';

const UserFavorite = ({className, ...rest}) => {

    const user= JSON.parse(localStorage.getItem('user'));
    const [favoritesList,setFavoritesList] = useState();


    const getFavorites = async ()=>{
        const favorites = await api.get(`/customer/favorite/${user.id}`);
        setFavoritesList(favorites.data);
    }

    useEffect(()=>{
        getFavorites();
    },[]);
    
    return(
            favoritesList.map((fav)=>(
                 <div>{JSON.stringify(fav)}</div>
            ))      
    )
};

UserFavorite.propTypes = {
    className: PropTypes.string,
};
UserFavorite.defaultProps = {
    className: '',
};
export default React.memo(UserFavorite);
