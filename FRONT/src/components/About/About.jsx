import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './about.scss';
// import Paypal from '../Paypal/Paypal'
import Paquet from '../public/icones/paquet.png'
import Parlant from '../public/icones/parlant.png'
import Creatif from '../public/icones/creatif.png'
import Reseau from '../public/icones/reseau.png'
import Remarketing from '../public/icones/remarketing.png'
import Drapeau from '../public/icones/drapeau.png'
import Diapo12 from '../public/DocumentsPdf/diapo-2012-2013.pdf'
import Diapo13 from '../public/DocumentsPdf/diapo-2013-2014.pdf'
import Diapo14 from '../public/DocumentsPdf/diapo-2014-2015.pdf'
import Diapo15 from '../public/DocumentsPdf/diapo-2015-2016.pdf'
import Diapo16 from '../public/DocumentsPdf/diapo-2016-2017.pdf'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import IconButton from '@mui/material/IconButton';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import Wordscloud from '../Wordscloud/Wordscloud';


const About = ({className, ...rest}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   return (
       <div
            className={classnames('about', className)}
            {...rest}
         >
             <div>
                 <div className='who'>
                    <h2 className='who-title'>
                        <img className='who-title-logo' src={Drapeau} alt="qui somme nous" />
                        Qui sommes nous ?
                    </h2>
                     <p>
                    <div className='who-content-nuage'>
                    <Wordscloud />
                     </div>
                        Lud'Autisme est une association créée en 2009, à l'initiative de parents d'enfants handicapés, ayant pour but d'accompagner les personnes en difficultés d'apprentissage ou d'autonomie dans leur parcours au quotidien.
                    </p>
                </div>



                <div className='content-actions'>
                <div className='actions'>
                    <h2 className='actions-title'>
                    Nos buts
                    </h2>

                    <div className='actions-li'>
                    <img className='actions-li-icons' src={Paquet} alt="accompagner" />
                    <p>
                    Prêt de jeux éducatifs et de matériels pour les enfants en difficultés de développement
                    </p>
                    </div>

                    <div className='actions-li'>
                    <img className='actions-li-icons' src={Parlant} alt="accompagner" />
                    <p>
                    Réaliser des actions pour favoriser l'échange, la communication, le partage et l'aide avec les familles autour de la situation de handicap.
                    </p>
                    </div>

                    <div className='actions-li'>
                    <img className='actions-li-icons' src={Creatif} alt="accompagner" />
                    <p>
                     Mener des projets permettant de favoriser la prise en charge spécifique des enfants présentant des troubles du développement.
                     </p>
                     </div>

                     <div className='actions-li'>
                     <img className='actions-li-icons' src={Reseau} alt="accompagner" />
                     <p>
                    Accompagner et soutenir les actions du réseau pour sensibiliser au handicap.
                    </p>
                    </div>

                    <div className='actions-li'>
                    <img className='actions-li-icons' src={Remarketing} alt="s'impliquer" />
                    <p>
                    S’impliquer dans la défense de la dignité des personnes handicapées.
                    </p>
                    </div>
                    </div>

                </div>

                <div className='about-philo'>
                    <h2 className='about-philo-title'>
                    Notre philosophie
                    </h2>

                    <p><ArrowRightRoundedIcon className='about-philo-icon' />
                    Jouer est essentiel pour développer les capacités cognitives et les échanges avec l’environnement. <br />
                    <br />
                    <ArrowRightRoundedIcon className='about-philo-icon'/>
                    Les personnes en difficulté d’apprentissage ont aussi besoin d’être stimulées à la maison.<br />
                    <br />
                    <ArrowRightRoundedIcon className='about-philo-icon'/>
                    Les jeux et le matériel adaptés sont onéreux et leur utilisation est parfois de courte durée.<br />
                    <br />
                    <ArrowRightRoundedIcon className='about-philo-icon'/>
                    Tester un jeu permet de s’assurer de l’utilité de son achat.<br />
                    <br />
                    <ArrowRightRoundedIcon className='about-philo-icon'/>
                    La matériathèque est aussi un lieu d'échange sur la vie quotidienne, les difficultés mais aussi les réussites et les progrès.<br />
                    <br />
                    <ArrowRightRoundedIcon className='about-philo-icon'/>
                    L’association mène des projets et soutient les actions permettant d’améliorer l’accompagnement des personnes à besoins particuliers.<br />
                </p>
             </div>

             <div className='actions-passées'>
                 <h2 className='actions-passées-title'>
                    Nos actions passées
                </h2>
                <p>
                    Ci dessous vous trouverez les archives des événements de l’association qui se sont déroulés depuis avril 2012. <br />
                    <br />
                    Cette date ne correspond pas au début de nos actions, débutées bien avant, mais depuis avril 2012, nous les mettons en images !
                </p>
            <div className='actions-passées-diapos' >
                        <div className='clay actions-passées-body'>
                            <Link className='actions-passées-body-link' onClick={handleOpen}>
                                <p>
                                    Diaporama 2012-2013
                                </p>
                            <IconButton aria-label="diapo-2012" size="large">
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
                                        <iframe className='actions-passées-body-pdf-modal' title='diapo-2012' src={Diapo12} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                        </div>

                        <div className='clay actions-passées-body'>
                            <Link className='actions-passées-body-link' onClick={handleOpen}>
                                <p>
                                    Diaporama 2013-2014
                                </p>
                            <IconButton aria-label="diapo-2013" size="large">
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
                                        <iframe className='actions-passées-body-pdf-modal' title='diapo-2013' src={Diapo13} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                        </div>

                        <div className='clay actions-passées-body'>
                            <Link className='actions-passées-body-link' onClick={handleOpen}>
                                <p>
                                    Diaporama 2014-2015
                                </p>
                            <IconButton aria-label="diapo-2014" size="large">
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
                                        <iframe className='actions-passées-body-pdf-modal' title='diapo-2014' src={Diapo14} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                        </div>

                        <div className='clay actions-passées-body'>
                            <Link className='actions-passées-body-link' onClick={handleOpen}>
                                <p>
                                    Diaporama 2015-2016
                                </p>
                            <IconButton aria-label="diapo-2015" size="large">
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
                                        <iframe className='actions-passées-body-pdf-modal' title='diapo-2015' src={Diapo15} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                        </div>

                        <div className='clay actions-passées-body'>
                            <Link className='actions-passées-body-link' onClick={handleOpen}>
                                <p>
                                    Diaporama 2016-2017
                                </p>
                            <IconButton aria-label="diapo-2016" size="large">
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
                                        <iframe className='actions-passées-body-pdf-modal' title='diapo-2016' src={Diapo16} frameborder="0"></iframe>
                                </Fade>
                            </Modal>
                        </div>

            </div>

             </div>

             </div>
         </div>
   );
};

About.propTypes = {
    className: PropTypes.string,
};
About.defaultProps = {
    className: '',
};
export default React.memo(About);

