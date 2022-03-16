import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './infos.scss';
import Permanency from '../Permanency/Permanency';
import Contact from '../Contact/Contact';
import PhotoLudo from '../public/icones/photo.png'
import Epingler from '../public/icones/epingler.png'
import Lettre from '../public/icones/lettre.png'
import Adhérent from '../public/icones/adhérent.png'
import Bénévole from '../public/icones/bénévole.png'
import Adhésion from '../public/DocumentsPdf/Fiche d_adhésion Lud_autisme.pdf'
import Réglement from '../public/DocumentsPdf/Règlement intérieur Lud_autisme.pdf'
import Tarifs from '../public/DocumentsPdf/Flyer Lud_autisme.pdf'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import IconButton from '@mui/material/IconButton';
import Paypal from  '../Paypal/Paypal';
import Tirelire from '../public/icones/tirelire.png'
import Facebook from '../public/icones/Logo-Facebook.png'
import News from '../public/icones/nouvelles.png'

const Infos = ({className, ...rest}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   return (
    <div className={classnames('practicalinformations', className)}
    {...rest}>

        <div className="infos-header">
            <div className="infos-header-local">
                <img src={PhotoLudo} alt="local lud'autisme"/>
            </div>

            <div className="infos-header-adresse">
                <p>
                    <h2>
                        <img src={Epingler} alt="permanence" />
                        Venir aux permanences
                    </h2>
                    <b> Maison Pour Tous / Maison des Familles </b> <br />
                    Place François Mitterrand<br />
                    29800 Landerneau<br />
                </p>
                <p>
                    <h2>
                        <img src={Lettre} alt="lettre" />
                        Nous contacter
                    </h2>
                    <b> Siège social de Lud’Autisme </b> <br />
                    8 rue traverse<br />
                    29800 Landerneau<br />
                    06 72 63 38 77 - 09 51 85 03 55<br />
                    <a href="#contact">ludautisme@gmail.com</a>
                </p>
            </div>

            <div className="infos-header-permap">
            <Permanency />
            <iframe title="ludo'map" className="infos-header-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.1474306172313!2d-4.257497284157107!3d48.45370073706886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4816b2c241a4e6ab%3A0xe04f55b4d36b897c!2sMaison%20Pour%20Tous%2FCentre%20Social!5e0!3m2!1sfr!2sfr!4v1646304683575!5m2!1sfr!2sfr" loading="lazy"></iframe>
            </div>

        </div>

        <div className='become'>
            <div className=' become-cat'>
                <div className='become-adhérent'>
                <div className='become-title'>
                    <img className='become-title-img' src={Adhérent} alt="logo-adhérent" />
                    <h2 className='become-bénévole-title'>
                        Devenir adhérent
                    </h2>
                </div>
                <div className='become-body'>
                    <p className='become-body-description'>
                        L'adhésion se fait sur place, au local de l'association. <br />

                        Consultez et téléchargez les documents relatifs ici: <br />

                    </p>


                    <ul className='become-body-list'>
                        <li className='clay li'>
                        <div className='become-body-docs'>

                            <Link className='become-body-link' onClick={handleOpen}>
                            <p>
                                Fiche d'adhésion
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
                                        <iframe className='become-body-pdf-modal' title='réglement' src={Adhésion} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                            </div>
                        </li>
                        <li className='clay li'>
                        <div className='become-body-docs'>

                            <Link className='become-body-link' onClick={handleOpen}>
                            <p>
                                Réglement intérieur
                            </p>
                            <IconButton aria-label="réglement" size="large">
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
                                        <iframe className='become-body-pdf-modal' title='réglement' src={Réglement} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                            </div>
                        </li>

                            <li className='clay li'>
                                <div className='become-body-docs'>

                                <Link className=' become-body-link' onClick={handleOpen}>
                                <p>
                                Informations et tarifs
                                </p>
                                <IconButton aria-label="infos" size="large">
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
                                            <iframe className='become-body-pdf-modal' title='tarifs' src={Tarifs} frameborder="0"></iframe>
                                    </Fade>
                                </Modal>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </div>
            </div>

            <div className='become-cat'>
                <div className='become-bénévole'>
                <div className='become-title'>
                <img className='become-title-img' src={Bénévole} alt="logo-bénévole" />
                    <h2 className='become-bénévole-title'>
                        Devenir bénévole
                    </h2>
                </div>
                <div className='become-bénévole-body'>
                <p> Vous souhaitez nous aider en consacrant un peu de votre temps à l’association?
                    Vous êtes les bienvenus ! <br />
                <br />
                Nous avons notamment besoin de bénévoles lors des permanences, pour occuper les enfants ainsi que pour nous aider dans l’enregistrement des retours et des emprunts du matériel. <br />
                <br />
                Par ailleurs, si vous souhaitez vous investir dans la gestion de l’association, nous faire profiter d’un de vos talents ou encore nous aider dans l’organisation d’une manifestation, contactez-nous ! <br />
                </p>
                </div>

                </div>
            </div>
            </div>



        <div className='infos-bottom'>
            <div className="infos-bottom-contact" id="contact">
                <Contact />
            </div>

            <div className='infos-bottom-right'>
                <div className='infos-bottom-facebook'>
                    <h2>
                        <img className='infos-bottom-actus-logo' src={News} alt="logo actus" />
                        Suivre nos actualités
                    </h2>
                    <button className='infos-bottom-facebook-button'>
                        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/Ludautisme-344242315626617/">
                            <img className='infos-bottom-facebook-logo'src={Facebook} alt="facebook logo" />
                            Page Facebook de Lud'Autisme
                        </a>
                    </button>
                </div>
                <div className='infos-bottom-paypal'>
                    <div className='infos-bottom-paypal-content'>
                    <h2 className='infos-bottom-paypal-title'>
                    <img className='infos-bottom-paypal-logo' src={Tirelire} alt="tirelire-don" />
                        Faire un don à l'association
                    </h2>
                    <Paypal className='paypalButton' />
                    </div>
                </div>
                </div>


        </div>

</div>

);
};

Infos.propTypes = {
    className: PropTypes.string,
};
Infos.defaultProps = {
    className: '',
};
export default React.memo(Infos);


