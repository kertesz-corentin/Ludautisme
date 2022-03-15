import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './currentreference.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Unavailable from '../Unavailable/Unavailable';
import Available from '../Available/Available';
import {  Divider } from '@mui/material';
import { useState, useContext } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';

const CurrentReference = ({
    className,
    id,
    name,
    description,
    maincategory,
    picture,
    tag,
    valorisation,
    removeItem,
     }) => {

    //GET USER ID
    const userToken = JSON.parse(localStorage.getItem('user'));

    function handleRemoveClick (){
        console.log(`ARTICLE TO DELETE`)
    }
   return (

        <Card className = "cartCard" >
            <CardMedia
                component="img"
                height="140"
                image={picture[0].url}
                alt="image about the article"
                sx={{ maxWidth: 345 }}
            />
            <CardContent className = "cardContent">
                <Typography
                    className='cartTitle'
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                {name}
                </Typography>
                {userToken &&
                    <Button
                    onClick={handleRemoveClick}>
                        <RemoveIcon/>
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
