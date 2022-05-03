import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

const PdfButton = ({
    key,
    year,
    link,
    alt,
    ...rest
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        < div className='clay actions-passées-body' >
            <Link className='actions-passées-body-link' onClick={handleOpen}>
                <p>
                    {year}
                </p>
                <IconButton aria-label={alt} size="large">
                    <OpenInNewRoundedIcon className='actions-passées-body-link-button' />
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
                    <iframe className='actions-passées-body-pdf-modal' title={alt} src={link} frameborder="0"></iframe>
                </Fade>
            </Modal>
        </div>
    )
}


PdfButton.propTypes = {
    key: PropTypes.number,
    year: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
}
export default React.memo(PdfButton);