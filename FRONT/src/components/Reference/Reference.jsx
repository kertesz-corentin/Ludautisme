import React from 'react';
import { useState, useContext, useEffect } from 'react';
import LazyImage from '../LazyImage/LazyImage'
import PropTypes from 'prop-types';
import './reference.scss';

import {Box,Modal,Fade,Button,Skeleton,
        Divider,Card,CardMedia,Typography,
        Avatar,Backdrop
      } from '@mui/material';
import Unavailable from '../Unavailable/Unavailable';
import Available from '../Available/Available';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HideImageIcon from '@mui/icons-material/HideImage';
import { FunctionContext } from '../App/App';

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

    const showMainImage = (pictures) => {
      if (pictures[0].id === null){
        return
      }
      const main = pictures.find(pic=>pic.main);
      return (main.length) ? main : pictures[0]
    }

   return (

        <Card className = "card" sx={{ width: 300, height:300 }}>
          {(showMainImage(picture))
          ?
        //    <CardMedia
        //         component="img"
        //         height="200"
        //         image={showMainImage(picture).url}
        //         alt="image about the article"
        //     />
        <LazyImage
            src={showMainImage(picture).url}
            alt={showMainImage(picture).text}
        />
          :
          <Box sx={{ width: '300px', height:'200px' }} className='reference-card__image-not-found'>
          <HideImageIcon  className='reference-card__image-not-found--icon'/>
          </Box>

          }
                <Typography className="reference-card__name">
                {name}
                </Typography>
                {/* <Typography className="reference-card__description">
                  {description}
                </Typography > */}
                { (display !== "booking") &&
                    <Box className="reference-card__footer">
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
