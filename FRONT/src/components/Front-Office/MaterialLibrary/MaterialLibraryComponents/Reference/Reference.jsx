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
import AddCommentIcon from '@mui/icons-material/AddComment';
import EditCommentModale from '../../../../Admin/EditCommentModal/EditCommentModal';
import { toast } from 'react-toastify';

const Reference = ({
    display,
    currentItems,
    gridSize,
    reference
}) => {
    const [open, setOpen] = React.useState(false);
    const [articleNumber, setArticleNumber] = React.useState();
    const handleOpen = async () => {
        // get article number of reference
        let numberList = [];
        for (const articlNb of articles_list) {
            numberList.push(articlNb.number)
        }
        setArticleNumber(`n° :${numberList.join(', ')}`);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const cartManager = useContext(FunctionContext);
    const userToken = JSON.parse(localStorage.getItem('user'));
    const { valorisation, tag, picture, maincategory, name, id, description, articles_list } = reference;

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
    const [isFav, setIsFav] = useState(reference.favorite);

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

    const handleAddComment = async (comment) => {
        try {
            let option = {
                'comment': comment
            }

            const response = await toast.promise(
                api.post(`/customer/articles/comment/${reference.art_id}`, option),
                {
                    pending: `Ajout du commentaire`,
                    error: "Erreur lors de l'ajout"
                }
            );
            if (response.status === 200) {
                toast.success("Commentaire ajouté")
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
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
                    {(display === 'booking') ? `N°${reference.art_id} ${name}` : name}
                </Typography>
                {(display !== "booking") &&
                    <Box className="reference-card__footer">
                        <Button onClick={handleOpen}>Détails</Button>
                        {(userToken) ?
                            <>
                                <Button data-refid={id} data-favvalue={reference.favorite} onClick={handleFavorite}>{
                                    <FavoriteIcon color={(isFav) ? 'error' : 'disabled'} />}
                                </Button>
                                {(reference.nb_available > 0 && currentItems) ?
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
                {(display === "booking") &&
                    <EditCommentModale
                        button={<AddCommentIcon />}
                        title={"Envoyer un commentaire"}
                        callBack={handleAddComment}
                    />
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
                        <Box className='reference-card__wrapper'>
                            <Box className="transition-modal-inline">
                                <Typography className="transition-modal-title" variant="h6" component="h2">
                                    {name} ({articleNumber})
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
                            <Box sx={{ marginBottom: "15px", display: 'flex', justifyContent: 'space-evenly' }}>
                                {reference.nb_available > 0 ? <Available nbAvailable={reference.nb_available} nbTotal={reference.nb_total} /> : <Unavailable />}

                                {(userToken) ?
                                    <>
                                        {(reference.nb_available > 0 && currentItems) ?
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
