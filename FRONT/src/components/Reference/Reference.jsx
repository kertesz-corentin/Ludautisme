import React from 'react';
import { useState, useContext, useEffect } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import ReferenceSwiper from '../ReferenceSwiper/ReferenceSwiper';
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
import { FunctionContext } from '../App/App';
import HideImageIcon from '@mui/icons-material/HideImage';

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
    gridSize,
    isLoading,
     }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const cartManager = useContext(FunctionContext);
    const userToken = JSON.parse(localStorage.getItem('user'));

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
      if (pictures){
        if(pictures[0].id === null){
        return
        }
        const main = pictures.find(pic=>pic.main);
        return (main.length) ? main : pictures[0]
      }

    }

   return (

        <Card className = "reference-card"
              sx={{ width: gridSize, height:gridSize }}
            >

            <ReferenceSwiper
                refId={id}
                pictures={picture}
                gridSize={gridSize}
            />
            {/* Card Loading */}
            {(!isLoading)
            ?

            <Box>
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
            </Box>
            :
            <Box>
                <Skeleton key= {`skeleton-card ${id}`} height={1000} style= {{marginTop:'-100%'}}/>
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
                <Avatar sx={{width:'4rem',color:"rgba(0,0,0,0.8)",bgcolor:"rgba(0,0,0,0)", border:"2px solid rgba(0,0,0,0.6)", fontSize: 13, fontWeight:"600", p:2, borderRadius:"25px" }} variant="rounded">
                        {(valorisation===0) ? '- €' : `${valorisation}€`}
                    </Avatar>
                    </Box>
                <Box style={{display:'flex',justifyContent:'center',padding:'15px 0',overflow:'hidden'}}>
                 <ReferenceSwiper
                refId={id}
                pictures={picture}
                gridSize={gridSize}
                />
                </Box>
                <Divider/>
                <Typography className="transition-modal-description" variant="h6" component="h5">
                  {description}
                </Typography>
                    <Box sx={{marginBottom:"15px",display:'flex',justifyContent:'space-evenly'}}>
                        {nb_available > 0 ? <Available nbAvailable={nb_available} nbTotal={nb_total}/> : <Unavailable/>}

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
