import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './contact.scss';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Contact = ({className, ...rest}) => {
   return (
       <div className={classnames('contact', className)}
            {...rest}>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch'},
                    }}
                    noValidate
                    autoComplete="off">
                        <div>
                            <h2 className="contact-form-title">
                                Nous écrire
                            </h2>
                        </div>

                        <div>
                            <TextField
                            id="outlined-textarea"
                                label="Nom - Prénom"
                                className='contact-form-text'
                                size="small"/>

                            <TextField
                            id="outlined-textarea"
                                label="Email"
                                className='contact-form-text'
                                size="small"/>

                            <TextField
                            id="outlined-textarea"
                                label="Objet"
                                className='contact-form-text'
                                size="small"
                                multiline/>

                            <TextField
                            id="outlined-multiline-static"
                            rows={4}
                                label="Message"
                                className='contact-form-text'
                                multiline
                                />
                        </div>
                        <div>
                            <Button className="contact-button" variant="contained">Envoyer votre message</Button>
                        </div>
                </Box>



            </div>

   );
};

Contact.propTypes = {
    className: PropTypes.string,
};
Contact.defaultProps = {
    className: '',
};
export default React.memo(Contact);
