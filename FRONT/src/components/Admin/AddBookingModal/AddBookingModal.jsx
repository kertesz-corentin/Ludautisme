import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Box, Typography}
import classnames from 'classnames';
import './addbookingmodal.scss';

const AddBookingModal = ({className, ...rest}) => {
    return (
        <div
            className={classnames('addbookingmodal', className)}
            {...rest}
        >
            <Button onClick={handleOpen}>Ajouter référence</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="modal" component="form" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Nouvelle Référence
                        </Typography>
                        <Button
                            className='modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="modal-inputs">
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='name'
                            type='string'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='textarea'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Valorisation'
                            name='valorisation'
                            type='number'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <FormControl fullWidth>
                            <InputLabel id="maincategory-label">Catégorie</InputLabel>
                            <Select
                                labelId="maincategory-label"
                                id="main_category"
                                name="main_category"
                                label="Catégorie"
                                onChange={handleChange}
                                value={category}
                            >
                            {categories.map((category) => {
                                return (
                                    <MenuItem value={category.id}>{category.name}</MenuItem>
                                )
                            })}
                            </Select>
                        </FormControl>

                    </div>
                    <div className="modal-footer">
                        <Button
                            type='submit'
                            className="modal-footer-submit"
                            variant="contained"
                        >
                            Valider
                        </Button>
                    </div>
                </Box>
            </Modal>

        </div>
    );
};

AddBookingModal.propTypes = {
    className: PropTypes.string,
};
AddBookingModal.defaultProps = {
    className: '',
};
export default React.memo(AddBookingModal);
