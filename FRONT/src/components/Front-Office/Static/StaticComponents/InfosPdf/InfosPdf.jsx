import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

const AboutPdf = ({
    title,
    link,
    alt,
     ...rest }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <li className='clay li'>
                        <div className='become-body-docs'>

                            <Link className='become-body-link' onClick={handleOpen}>
                            <p>
                                {title}
                            </p>
                            <IconButton aria-label="adhésion" size="large">
                                    <OpenInNewRoundedIcon className='become-body-link-button' />
                                    </IconButton>
                                </Link>
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
                                        <iframe className='become-body-pdf-modal' title={alt} src={link} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                            </div>
                        </li>

    )
    }
    AboutPdf.propTypes = {
        title: PropTypes.string,
        year: PropTypes.string,
        link: PropTypes.string,
        alt: PropTypes.string,
    }
    export default React.memo(AboutPdf);
