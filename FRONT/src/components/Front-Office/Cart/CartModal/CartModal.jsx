import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './cartmodal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CurrentReference from '../../MaterialLibrary/MaterialLibraryComponents/CurrentReference/CurrentReference';
import api from '../../../../requests/index';
import { toast } from 'react-toastify';

const CartModal = ({
    open,
    handleClose,
    setModalOpen,
    className,
    currentItemsNumber,
    currentItems,
    userId,
    cartManager,
     ...rest
    }) => {

    function handleRemoveItemClick  () {
        (currentItems.length === 0) && handleClose() ;
    }

    //CLICK ON VALIDATE CART
    const handleSubmit =  async (event) => {
        event.preventDefault();
        const refIds = {
            refIds : currentItems.map((item)=>{return item.id}),
        };

        const response = await toast.promise(
            api.post(`/customer/booking/add/${userId}`, refIds), 
            {
                pending: `Ajout de la réservation`,
                error: 'Erreur lors de la réservation'
            }
        );
        if (response.status === 200){
            toast.success('Votre réservation a bien été prise en compte');
        } else {
            toast.error(response.data.message);
        };
    }
    //CALLBACK USED IN CURRENT REFERENCE TO GET ITEM AND DELETE HERE IN currentCart
    const removeItem = (itemId) =>{
       cartManager.remove(itemId);
    }

    useEffect(()=> {
        countSentence();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[open]);


    const countSentence = ()=>{
        if (currentItems === null){
            return `Votre panier est vide`
        }
         if (currentItems.length ===0){
             return `Votre panier est vide`
          } else
        if (currentItems.length > process.env.REACT_APP_BORROW_LIMIT) {
             return `Vous ne pouvez pas réserver plus de ${process.env.REACT_APP_BORROW_LIMIT} articles`
         } else {
             return `Vous pouvez encore réserver ${process.env.REACT_APP_BORROW_LIMIT - currentItems.length} articles`
         }

    }

    return (
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
                                changeCounter = {handleRemoveItemClick}
                                removeItem = {removeItem}
                                currentItem = {currentItem}
                                //handleClose={handleClose}
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
    );
};

CartModal.propTypes = {
    className: PropTypes.string,
};
CartModal.defaultProps = {
    className: '',
};
export default React.memo(CartModal);
