import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './referencemodal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ReferenceModal = ({className, ...rest}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
          <Button onClick={handleOpen}>description</Button>
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
              <Box className="referencemodal">
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
      );
};

ReferenceModal.propTypes = {
    className: PropTypes.string,
};
ReferenceModal.defaultProps = {
    className: '',
};
export default React.memo(ReferenceModal);
