import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './contact.scss';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

const Contact = ({className, ...rest}) => {
   return (
       <div className={classnames('contact', className)}
            {...rest}>
                <div className="contact-form">
                    <h2 className="contact-form-title">
                        Formulaire de contact
                    </h2>
                    <div className="contact-form-text" >
                    <TextField size="small" id="outlined-basic" label="Nom" variant="outlined"/>
                    </div>
                    <div className="contact-form-text" >
                    <TextField size="small" id="outlined-basic" label="Prénom" variant="outlined"/>
                    </div>
                    <div className="contact-form-text" >
                    <TextField size="small" id="outlined-basic" label="Objet" variant="outlined"/>
                    </div>
                    <div className="contact-form-text" >
                    <TextField size="small" id="outlined-basic" label="Message" variant="outlined"/>
                    </div>
                    <Button className="contact-button" variant="contained">Envoyer votre message</Button>
                </div>

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
