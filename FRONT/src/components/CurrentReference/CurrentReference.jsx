import React from 'react';
import PropTypes from 'prop-types';
import './currentreference.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Loader from '../Loader/Loader';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const CurrentReference = ({
    className,
    currentItem,
    removeItem,
    changeCounter,
     }) => {

    //GET USER ID
    const userToken = JSON.parse(localStorage.getItem('user'));

    function handleRemoveClick (){
        removeItem(currentItem.id);
        changeCounter()
        console.log(`taille du tableau`, currentItem)

    }
   return (
    !currentItem ?
        <Loader/>
    :
        <Card className = "cartCard" >
            <CardMedia
                component="img"
                height="140"
                image={currentItem.picture[0].url}
                alt="image about the article"
                sx={{ maxWidth: 345}}
            />
            <CardContent className = "cardContent">
                <Typography
                    className='cartTitle'
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                {currentItem.name}
                </Typography>
                {userToken &&
                    <Button
                    onClick={handleRemoveClick}>
                        <DeleteIcon/>
                    </Button>
                }
            </CardContent>
        </Card>
   );
};

CurrentReference.propTypes = {
    className: PropTypes.string,
};
CurrentReference.defaultProps = {
    className: '',
};
export default React.memo(CurrentReference);
