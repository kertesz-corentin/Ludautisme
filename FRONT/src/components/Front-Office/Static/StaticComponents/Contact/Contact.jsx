import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './contact.scss';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MessageLogo from '../../../../../public/icones/un-message.png';
import api from '../../../../../requests';
import AlertMessage from '../../../Reusable/AlertMessage/AlertMessage';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Contact = ({ className, ...rest }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [object, setObject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();

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
            setSeverity("error");
            setAlertMessage("email invalide");
        } else if (!name || !object || !message) {
            setSeverity("error");
            setAlertMessage("formulaire incomplet");
        } else if (!token) {
            setSeverity("error");
            setAlertMessage("captcha invalide");
        } else {
            const request = {
                name,
                email,
                object,
                message
            };
            const response = await api.post('/customer/contact/send', request);
            if (response.status === 200) {
                setSeverity("success");
                setAlertMessage("email envoyé");
                setName("");
                setEmail("");
                setObject("");
                setMessage("");
            } else {
                console.error(response.data);
            }
        }

    }

    const captchaError = (error) => {
        setSeverity("error");
        setAlertMessage("Captcha invalide");
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
                {alertMessage && severity && (
                    <AlertMessage
                        message={alertMessage}
                        severity={severity}
                    >
                    </AlertMessage>
                )}
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
