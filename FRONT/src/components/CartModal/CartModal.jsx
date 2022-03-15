import React from 'react';
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
import { useState } from 'react';
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
    let currentId = userToken.id;
    console.log(`Looking for ID`, currentId);

    //ACTUAL CART STATE
    const [currentCart,setCurrentCart] = useState(currentItems);
    console.log(`Mon Panier`, currentCart);

    //OPEN MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //COUNT ITEM IN CART
    let counter = currentItemsNumber;
    console.log(`Ensemble des articles en cours`, currentCart);

    //CLICK ON VALIDATE CART
    const handleSubmit =  async (event, currentItems) => {
        event.preventDefault();
        console.log(`envoi du cart au back`,currentItems);
        const response =  await api.post(`/customer/booking/add/${currentId}`, currentItems)
        if (response.status === 200){
        }else{
            console.log(`Une erreur est survenue`, response)
        };
    }
    //CALLBACK USED IN CURRENT REFERENCE TO GET ITEM AND DELETE HERE IN currentCart
    const removeItem = (item) =>{
        const deleteIndex = currentCart.indexOf(item);
        if (deleteIndex){
            setCurrentCart(currentCart.splice(item,1));
        } else {
            console.log("index de l'item non trouvé dans currentCart");
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
                {counter === 0 || counter === undefined
                ?
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Actuellement votre panier est vide
                    </Typography>
                :
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {counter}/8 { counter >=8 ?
                                                        <p>Vous avez atteint le nombre d'articles maximum </p>
                                                    :
                                                        <p>Nombre d'articles pouvant être reservés</p>
                            }
                        </Typography>
                }
                </Box>
                <Divider/>
                {currentItems &&
                <Box className = "cartItems">


                            <Typography id="transition-modal-title" variant="h6" component="h2">
                            Voici l'ensemble de vos articles :
                            </Typography>
                            <Box className="cartListItems">
                            {currentItems.map((currentItem)=>(
                            <CurrentReference
                                key = {currentItem.id}
                                id={currentItem.id}
                                name={currentItem.name}
                                description={currentItem.description}
                                maincategory={currentItem.maincategory}
                                picture={currentItem.picture}
                                tag={currentItem.tag}
                                valorisation={currentItem.valorisation}
                                removeItem = {removeItem}
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
