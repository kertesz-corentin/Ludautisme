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



const CartModal = ({
    className,
    currentItemsNumber,
    currentItems,
     ...rest
    }) => {
    //Need a new const cause when i delete item from CartModal , i want to work on a local state

    const currentCart = currentItems;
    console.log(`Mon Panier`, currentCart);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let counter = currentItemsNumber;
    console.log(`Ensemble des articles en cours`, currentCart);
//Récupérer l'id du user pour parametrer la route
    const handleSubmit =  async (event) => {
        event.preventDefault();
        console.log(`envoi du cart au back`);
        const response =  await api.post('/customer/booking/add', currentItems)
        if (response.status === 200){
        };
        console.log(response)
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
              {counter === 0 || counter === undefined
                ?
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Actuellement votre panier est vide
                    </Typography>
                :
                    <div>
                        {/* //Ajouter ici pour faire en sorte que le compteur ne puisse pas aller au dessus de 8 */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {counter}/8 { counter >=8 ?
                                                        <p>Vous avez atteint le nombre d'articles maximum </p>
                                                    :
                                                        <p>Nombre d'articles pouvant être reservés</p>
                            }
                        </Typography>
                        <Divider/>
                        {currentItems &&
                        <div>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                            Voici l'ensemble de vos articles :
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
                            />
                                ))}
                            </Typography>
                            <Button
                            onClick={handleSubmit}
                            >
                            Valider le panier
                            </Button>
                        </div>
                        }
                    </div>
              }
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
