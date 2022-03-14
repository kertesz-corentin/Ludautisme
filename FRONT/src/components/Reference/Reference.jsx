import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './reference.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import OneRef from '../OneRef/OneRef';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Unavailable from '../Unavailable/Unavailable';
import Available from '../Available/Available';
import {  Divider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useContext } from 'react';
import { FunctionContext } from '../App/App';

const Reference = ({
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
    const add = useContext(FunctionContext);

    let cartToAdd = {
    name,
    description,
    maincategory,
    picture,
    tag,
    valorisation
    }


    let [counter, setCounter] = useState(4);

//each time i add article to my booking, delete one on quantity

    function handleClick () {
        console.log(`add this article to my booking`,`id:`, id,`name:`,name,  `description:`, description,`valorisation:`, valorisation, `maincategory:`, maincategory, `tag:`, tag);
//ICI je récupère bien le bon article au click et ca c'est cool!!!
//Maintenant il faut faire en sorte que ça ne me consolelog qu'une carte!
        add(id, name, description, valorisation, maincategory, tag);
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
                {/* <OneRef
                    name={name}
                    description={description}
                    maincategory={maincategory}
                    picture={picture[0].url}
                    tag={tag}
                    valorisation={valorisation}
                /> */}
                <Button onClick={handleOpen}>description</Button>
          <Button
                    onClick={handleClick}>
                        <AddShoppingCartIcon/>
                    </Button>
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

Reference.propTypes = {
    className: PropTypes.string,
};
Reference.defaultProps = {
    className: '',
};
export default React.memo(Reference);
