import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './about.scss';
import Paquet from '../public/icones/paquet.png'
import Parlant from '../public/icones/parlant.png'
import Creatif from '../public/icones/creatif.png'
import Reseau from '../public/icones/reseau.png'
import Remarketing from '../public/icones/remarketing.png'
import Drapeau from '../public/icones/drapeau.png'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import Wordscloud from '../Wordscloud/Wordscloud';
import PdfButton from '../PdfButton/PdfButton';


const About = ({ className, ...rest }) => {

    const pdf = [
        { year: 'DIAPORAMA 2012-2013', link: './pdf/diapo-2012-2013.pdf', alt: 'diapo-2012' },
        { year: 'DIAPORAMA 2013-2014', link: './pdf/diapo-2013-2014.pdf', alt: 'diapo-2013' },
        { year: 'DIAPORAMA 2014-2015', link: './pdf/diapo-2014-2015.pdf', alt: 'diapo-2014' },
        { year: 'DIAPORAMA 2015-2016', link: './pdf/diapo-2015-2016.pdf', alt: 'diapo-2015' },
        { year: 'DIAPORAMA 2016-2017', link: './pdf/diapo-2016-2017.pdf', alt: 'diapo-2016' },
    ];

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
                        Lud'Autisme est une association créée en 2009, à l'initiative de parents d'enfants handicapés, ayant pour but d'accompagner les personnes en difficultés d'apprentissage ou d'autonomie dans leur parcours au quotidien.
                    </p>
                </div>

                <div className='everybody'>
                    <h2 className='actions-title'>Autisme mais pas que...</h2>
                    <div>
                        <div className='everybody-content'>
                             <p> Notre association s'adresse à toutes les personnes ayant des besoins spécifiques.</p>
                             <Wordscloud />
                        </div>
                    </div>
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
                        <ArrowRightRoundedIcon className='about-philo-icon' />
                        Les personnes en difficulté d’apprentissage ont aussi besoin d’être stimulées à la maison.<br />
                        <br />
                        <ArrowRightRoundedIcon className='about-philo-icon' />
                        Les jeux et le matériel adaptés sont onéreux et leur utilisation est parfois de courte durée.<br />
                        <br />
                        <ArrowRightRoundedIcon className='about-philo-icon' />
                        Tester un jeu permet de s’assurer de l’utilité de son achat.<br />
                        <br />
                        <ArrowRightRoundedIcon className='about-philo-icon' />
                        La matériathèque est aussi un lieu d'échange sur la vie quotidienne, les difficultés mais aussi les réussites et les progrès.<br />
                        <br />
                        <ArrowRightRoundedIcon className='about-philo-icon' />
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
                        {pdf.map((item, index) => (
                        <PdfButton
                            key={index}
                            year={item.year}
                            link={item.link}
                            alt={item.alt}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

About.propTypes = {
    className: PropTypes.string,
};
About.defaultProps = {
    className: '',
};
export default React.memo(About);

