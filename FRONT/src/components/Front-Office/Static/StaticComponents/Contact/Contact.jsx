import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './contact.scss';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MessageLogo from '../../../../../public/icones/un-message.png';
import api from '../../../../../requests';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { toast } from 'react-toastify';

const Contact = ({ className, ...rest }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [object, setObject] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [token, setToken] = React.useState(null);
    const captchaRef = React.useRef(null);

    const handleName = (event, value) => {
        setName(event.target.value);
    }

    const handleEmail = (event, value) => {
        setEmail(event.target.value);
    }
    const handleObject = (event, value) => {
        setObject(event.target.value);
    }

    const handleMessage = (event, value) => {
        setMessage(event.target.value);
    }

    const validForm = async () => {
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            toast.error("email invalide");
        } else if (!name || !object || !message) {
            toast.error("formulaire incomplet");
        } else if (!token) {
            toast.error("captcha invalide");
        } else {
            const request = {
                name,
                email,
                object,
                message
            };
            const response = await toast.promise(
                api.post('/customer/contact/send', request), 
                {
                    pending: `Envoi de l'email`,
                    error: `Erreur lors de l'envoi`
                }
            );
            if (response.status === 200) {
                toast.success("email envoyé");
                setName("");
                setEmail("");
                setObject("");
                setMessage("");
            } else {
                toast.error(response.data.message);
            }
        }

    }

    const captchaError = (error) => {
        toast.error("Captcha invalide")
    }

    return (
        <div className={classnames('contact', className)}
            {...rest}>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off">
                <div className='contact-header'>
                    <img src={MessageLogo} alt="contact-logo" />
                    <h2 className="contact-form-title">
                        Nous écrire
                    </h2>
                </div>

                <div>
                    <TextField
                        id="outlined-textarea"
                        label="Nom - Prénom"
                        className='contact-form-text'
                        size="small"
                        onChange={handleName}
                        value={name} />

                    <TextField
                        id="outlined-textarea"
                        label="Email"
                        className='contact-form-text'
                        size="small"
                        onChange={handleEmail}
                        value={email} />

                    <TextField
                        id="outlined-textarea"
                        label="Objet"
                        className='contact-form-text'
                        size="small"
                        onChange={handleObject}
                        value={object}
                        multiline />

                    <TextField
                        id="outlined-multiline-static"
                        rows={4}
                        label="Message"
                        className='contact-form-text'
                        onChange={handleMessage}
                        value={message}
                        multiline
                    />
                    <HCaptcha
                        sitekey="6b9cef95-cd94-4fbc-a4df-5819f3329ea5"
                        size="normal"
                        onVerify={setToken}
                        onError={captchaError}
                        onExpire={captchaError}
                        ref={captchaRef}
                    />
                </div>
                <div>
                    <Button className="contact-button" onClick={validForm} variant="contained">Envoyer votre message</Button>
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
