import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './cartmodal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider } from '@mui/material';
import CurrentReference from '../CurrentReference/CurrentReference';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import Loader from '../Loader/Loader';
import api from '../../requests/index';
const userToken = JSON.parse(localStorage.getItem('user'));



const CartModal = ({
    className,
    currentItemsNumber,
    currentItems,
     ...rest
    }) => {
    //ID USER
    let userId = userToken.id;

    //ACTUAL CART STATE
    console.log(`Mon Panier`,currentItems);

    useEffect(()=> {
        countSentence();
        },[currentItems]);

    //OPEN MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //COUNT ITEM IN CART
    let counter = currentItemsNumber;

    //CLICK ON VALIDATE CART
    const handleSubmit =  async (event) => {
        event.preventDefault();
        const refIds = {
            refIds : currentItems.map((item)=>{return item.id}),
        }
        console.log(`envoi du cart au back`, refIds);

        const response =  await api.post(`/customer/booking/add/${userId}`, refIds)
        if (response.status === 200){
        }else{
            console.log(`Une erreur est survenue`, response)
        };
    }
    //CALLBACK USED IN CURRENT REFERENCE TO GET ITEM AND DELETE HERE IN currentCart
    const removeItem = (item) =>{
        console.log(item,currentItems);
        const deleteIndex = currentItems.findIndex((currentItem) => currentItem.id === item);
        console.log("index",deleteIndex)
        if (deleteIndex !== -1){
            currentItems.splice(deleteIndex,1);
            countSentence();
            console.log("after Delete",currentItems);
        } else {
            console.log("index de l'item non trouvé dans currentCart");
        }
    }

    const countSentence = ()=>{
        if (currentItems.length){
            return `Votre panier est vide`
         } else if (currentItems.length > 8) {
             return `Vous ne pouvez pas réserver plus de 8 articles`
         } else {
             return `Vous pouvez encore réserver ${8 - currentItems.length} articles`
         }
    }

    return (
      <div>
        <Button onClick={handleOpen}><ShoppingCartIcon /></Button>
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
            <Box className="shopmodal">
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Mon panier
              </Typography>
              <Divider/>
              <Box className="cartDetails">
                <Box className = "cartCount">
                <Typography>{countSentence()}</Typography>
                </Box>
                <Divider/>
                {(currentItems && currentItems.length > 0) &&
                <Box className = "cartItems">
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                            Voici l'ensemble de vos articles :
                            </Typography>
                            <Box className="cartListItems">
                            {currentItems.map((currentItem,index)=>(
                            <CurrentReference
                                key = {index}
                                removeItem = {removeItem}
                                currentItem = {currentItem}
                            />
                                ))}
                            </Box>
                            <Button
                            onClick={handleSubmit}
                            >
                            Valider le panier
                            </Button>
                </Box>
                }
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
};

CartModal.propTypes = {
    className: PropTypes.string,
};
CartModal.defaultProps = {
    className: '',
};
export default React.memo(CartModal);
