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
    valorisation
     }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userToken = JSON.parse(localStorage.getItem('user'));

    let itemToRemove = {
        id,
        name,
        description,
        maincategory,
        picture,
        tag,
        valorisation
    }


    let [counter, setCounter] = useState(2);


    function handleRemoveClick (itemToRemove){

    }
   return (

        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={picture[0].url}
                alt="image about the article"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>

                <Button onClick={handleOpen}>description</Button>
                {userToken &&
                    <Button
                    onClick={handleRemoveClick}>
                        <RemoveIcon/>
                    </Button>
                }

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box className="ref">
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {name}
                </Typography>
                <Divider/>
                <Typography id="transition-modal-title" variant="h6" component="h5">
                  {description}
                </Typography>
                {counter > 0 ? <Available/> : <Unavailable/>}
                <Typography id="transition-modal-title" variant="h6" component="h5">
                Prix: {valorisation}
                </Typography>
                <Divider/>
                <CardMedia
                component="img"
                height="140"
                image={picture[0].url}
                alt="image about the article"
                className= "cardmedia"
            />
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                 <p> Categorie: {maincategory} </p>
                 <p> Sous catégories:{tag} </p>
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                 Quantité: {counter}
                </Typography>

              </Box>
            </Fade>
          </Modal>
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
