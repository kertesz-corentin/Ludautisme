import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './reference.scss';
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useContext, useEffect } from 'react';
import { FunctionContext } from '../App/App';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BlockIcon from '@mui/icons-material/Block';
import CancelIcon from '@mui/icons-material/Cancel'

const Reference = ({
    className,
    id,
    name,
    description,
    maincategory,
    picture,
    tag,
    valorisation,
    article,
    nb_available,
    nb_total,
    display,
    currentItems,
     }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const cartManager = useContext(FunctionContext);
    const userToken = JSON.parse(localStorage.getItem('user'));
    console.log("userToken",userToken);
    console.log("currentItems",currentItems);

    const [isClick, setIsClick] = useState(false);

    let itemToAdd = {
        id,
        name,
        description,
        maincategory,
        picture,
        tag,
        valorisation,
    }
    let [quantity, setQuantity] = useState(nb_available);
    //Need newQuantity to compare with quantity and know if article has been click already
    let [newQuantity, setNewQuantity] = useState(quantity);

    const [cartItems,setCartItems] = useState(currentItems);

    const updateCurrentItems =() =>{
        setCartItems(currentItems);
    }

    useEffect(()=>{updateCurrentItems()},[currentItems])

    function handleClick () {
        cartManager.add(itemToAdd);
    }

    function modifyIsClick () {
        setIsClick(!isClick)
    }


   return (

        <Card className = "card" sx={{ width: 345, height:345 }}>
            <CardMedia
                component="img"
                height="140"
                image={picture[0].url}
                alt="image about the article"
            />
                <Typography className="card-name" gutterBottom variant="h6">
                {name}
                </Typography>
                <Typography className="card-description">
                  {description}
                </Typography >
                { (display !== "booking") &&
                    <Box className="card-footer">
                    <Button onClick={handleOpen}>Détails</Button>
                        {(userToken)?
                            <>
                                {(nb_available > 0)?
                                    <>
                                         {(!currentItems.map((item)=> item.id).includes(id)) ?
                                              <Button
                                              onClick={handleClick}>
                                                  <AddShoppingCartIcon/>
                                                </Button>
                                         :
                                            <Box>
                                                <BookmarkAddedIcon/>
                                            </Box>
                                        }
                                    </>
                                    :
                                    <>
                                     <Box className="card-unavailable"
                                             disabled>
                                        <CancelIcon/>
                                        <Typography className="card-unavailable-text">Indisponible</Typography>
                                    </Box>
                                    </>
                                }
                            </>
                            :
                            <>
                            </>
                        }
                   </Box>
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
                <Typography className="transition-modal-title" variant="h6" component="h2">
                  {name}
                </Typography>
                <Divider/>
                <Typography className="transition-modal-title" variant="h6" component="h5">
                  {description}
                </Typography>
                {nb_available > 0 ? <Available/> : <Unavailable/>}
                <Typography className="transition-modal-title" variant="h6" component="h5">
                Prix: {valorisation}€
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
                 Quantité disponible: {nb_available} sur {nb_total}
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </Card>
   );
};

Reference.propTypes = {
    className: PropTypes.string,
};
Reference.defaultProps = {
    className: '',
};
export default React.memo(Reference);
