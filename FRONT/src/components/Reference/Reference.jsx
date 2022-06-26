import React from 'react';
import PropTypes from 'prop-types';
import './reference.scss';
import Card from '@mui/material/Card';
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
import Avatar from '@mui/material/Avatar';

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

    const [cartItems,setCartItems] = useState(currentItems);

    const updateCurrentItems =() =>{
        setCartItems(currentItems);
    }

    useEffect(()=>{updateCurrentItems()},[currentItems])

    function handleClick () {
        cartManager.add(itemToAdd);
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
                                {(nb_available > 0 && currentItems)?
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
                                       <Unavailable/>
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
              <Box className="transition-modal-inline">
                <Typography className="transition-modal-title" variant="h6" component="h2">
                  {name}
                </Typography>
                <Avatar sx={{ marginRight:"15px",color:"rgba(0,0,0,0.8)",bgcolor:"rgba(0,0,0,0)", border:"2px solid rgba(0,0,0,0.6)", fontSize: 13, fontWeight:"600", p:2, borderRadius:"25px" }} variant="rounded">
                        {valorisation}€
                    </Avatar>
                    </Box>
                <Divider/>
                <Typography className="transition-modal-description" variant="h6" component="h5">
                  {description}
                    </Typography>
                    <Box sx={{marginBottom:"15px"}}>
                        {nb_available > 0 ? <Available/> : <Unavailable/>}
                    </Box>

                <Divider/>
                <CardMedia
                component="img"
                height="140"
                image={picture[0].url}
                alt="image about the article"
                className= "transition-modal-cardmedia"
            />
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                 <p> Categorie: {maincategory} </p>
                 { tag &&
                 <p> Sous catégories: {tag.map(tg=> tg.name)} </p>
                 }
                </Typography>
                {(nb_available > 0) &&
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                 Quantité disponible: {nb_available} sur {nb_total}
                </Typography>
                }
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
