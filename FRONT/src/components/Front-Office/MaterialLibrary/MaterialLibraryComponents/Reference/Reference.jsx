import React from 'react';
import { useState, useContext, useEffect } from 'react';
import ReferenceSwiper from '../ReferenceSwiper/ReferenceSwiper';
import PropTypes from 'prop-types';
import './reference.scss';
import api from '../../../../../requests';

import {
    Box, Modal, Fade, Button,
    Divider, Card, Typography
    , Backdrop
} from '@mui/material';
import Unavailable from '../Unavailable/Unavailable';
import Available from '../Available/Available';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FunctionContext } from '../../../../App/App';
import CloseIcon from '@mui/icons-material/Close';

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
    idArticle,
    nb_total,
    display,
    currentItems,
    gridSize,
    isLoading,
    favorite,
}) => {
    const [open, setOpen] = React.useState(false);
    const [articles, setArticles] = React.useState();
    const handleOpen = async () => {
        // get article number of reference
        
        setOpen(true);
    };
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

    // eslint-disable-next-line no-unused-vars
    const [cartItems, setCartItems] = useState(currentItems);
    const [isFav, setIsFav] = useState(favorite);

    const updateCurrentItems = () => {
        setCartItems(currentItems);
    }

    const handleFavorite = async () => {
        (isFav)
            ? await api.delete(`/customer/favorite/${userToken.id}`, { refId: id })
            : await api.post(`/customer/favorite/${userToken.id}`, { refId: id });
        setIsFav(!isFav);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { updateCurrentItems() }, [currentItems])

    function handleClick() {
        cartManager.add(itemToAdd);
    }



    return (

        <Card className="reference-card"
            sx={{ width: gridSize }}
        >
            <ReferenceSwiper
                refId={id}
                pictures={picture}
                gridSize={gridSize}
            />
            <Box>
                <Typography noWrap className="reference-card__name">
                    {(display === 'booking') ? `N°${idArticle} ${name}` : name}
                </Typography>
                {(display !== "booking") &&
                    <Box className="reference-card__footer">
                        <Button onClick={handleOpen}>Détails</Button>
                        {(userToken) ?
                            <>
                                <Button data-refid={id} data-favvalue={favorite} onClick={handleFavorite}>{
                                    <FavoriteIcon color={(isFav) ? 'error' : 'disabled'} />}
                                </Button>
                                {(nb_available > 0 && currentItems) ?
                                    <>
                                        {(!currentItems.map((item) => item.id).includes(id)) ?
                                            <Button
                                                onClick={handleClick}>
                                                <AddShoppingCartIcon />
                                            </Button>
                                            :
                                            <Box>
                                                <BookmarkAddedIcon />
                                            </Box>
                                        }
                                    </>
                                    :
                                    <>
                                        <Unavailable />
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
                        <Box className='reference-card__close' onClick={handleClose}>
                            <p>Fermer</p>
                            <CloseIcon className='reference-card__close--icon' />
                        </Box>
                        <Box className='reference-card__wrapper'>
                            <Box className="transition-modal-inline">
                                <Typography className="transition-modal-title" variant="h6" component="h2">
                                    {name}
                                </Typography>
                                <Button
                                    onClick={handleClose}>
                                    <CloseIcon className='reference-card__close--icon' />
                                </Button>
                            </Box>
                            <Box style={{ background: 'white', display: 'flex', justifyContent: 'center', padding: '15px 0', overflow: 'hidden', minHeight: '300px' }}>
                                <ReferenceSwiper
                                    refId={id}
                                    pictures={picture}
                                    gridSize={gridSize}
                                />
                            </Box>
                            <Divider />
                            <Typography className="transition-modal-description" variant="h6" component="h5">
                                {description}

                            </Typography>
                            <Typography className="reference-card__caution">
                                {(valorisation === 0) ? '' : `Caution : ${valorisation}€`}
                            </Typography>
                            <Box sx={{ marginBottom: "15px", display: 'flex', justifyContent: 'space-evenly' }}>
                                {nb_available > 0 ? <Available nbAvailable={nb_available} nbTotal={nb_total} /> : <Unavailable />}

                                {(userToken) ?
                                    <>
                                        {(nb_available > 0 && currentItems) ?
                                            <>
                                                {(!currentItems.map((item) => item.id).includes(id)) ?
                                                    <Button
                                                        onClick={handleClick}>
                                                        <AddShoppingCartIcon />
                                                    </Button>
                                                    :
                                                    <Box>
                                                        <BookmarkAddedIcon />
                                                    </Box>
                                                }
                                            </>
                                            :
                                            <>
                                                <Unavailable />
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </Box>
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
