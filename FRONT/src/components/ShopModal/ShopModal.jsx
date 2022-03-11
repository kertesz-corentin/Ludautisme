import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './shopmodal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider } from '@mui/material';
import Reference from '../Reference/Reference';
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import { useState } from 'react';


const ShopModal = ({className, ...rest}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [counter, setCounter] = useState (0)




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
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {counter}/8
              </Typography>
              <Divider/>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Voici l'ensemble de vos articles :
                <ListOfReferences/>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
};

ShopModal.propTypes = {
    className: PropTypes.string,
};
ShopModal.defaultProps = {
    className: '',
};
export default React.memo(ShopModal);
