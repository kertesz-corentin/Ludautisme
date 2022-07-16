import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './homepage.scss';
import { NavLink } from "react-router-dom";
import Permanency from '../../Reusable/Permanency/Permanency';
import "claymorphism-css/dist/clay.scss";
import Logo1 from "../../../../public/icones/bloguer.png";
import Logo2 from "../../../../public/icones/commerce-electronique.png";
import Logo3 from "../../../../public/icones/magasin.png";
import Logo4 from "../../../../public/icones/check.png";
import Logo5 from "../../../../public/icones/arrow.png";
import Logo6 from "../../../../public/icones/echecs.png";
import Logo7 from "../../../../public/icones/fusee.png";
import Logo8 from "../../../../public/icones/idee.png";
import Logo9 from "../../../../public/icones/puzzle.png";
import Logo10 from "../../../../public/icones/signet.png";
import FacebookPost from "../../../../public/facebook-post.png";
import Contact from '../StaticComponents/Contact/Contact';

const Accueil = ({className, ...rest}) => {
    return (
        <div className={classnames('accueil', className)}
        {...rest}>

            <div className="bandeau-présentation">
                <div className='content-container--max-width'>
                    <div className="bandeau-présentation-texte">
                    <h2>Bienvenue à lud'autisme !</h2>
                    <p>
                        Prêt de jeux et de matériels adaptés pour les personnes en difficultés d'apprentissage et/ou d'autonomie <br/>

                        Pour les particuliers adhérents et les professionnels partenaires. <br />
                    </p>
                    <h4>Autisme mais pas que… </h4>
                    <p> Notre association s’adresse à toutes les personnes ayant des besoins spécifiques</p>
                    </div>
                    <div className="bandeau-présentation-permanence">
                                <Permanency />
                    </div>
                </div>
            </div>

            <div className="fonctionnement">
                <h2 className="fonctionnement-title">Comment ça marche?</h2>
                    <div className="fonctionnement-content">
                            <img className="fonctionnement-logo" src={Logo1} alt="s'incrire" />
                        <p>Inscrivez-vous auprès de l'association en tant qu'adhérent</p>
                    </div>
                    <img className="fonctionnement-logo2" src={Logo5} alt="fleche" />
                    <div className="fonctionnement-content">
                        <img className="fonctionnement-logo" src={Logo2} alt="sélectionner les articles" />
                        <p>Parcourez notre matériathèque et choisissez parmi des milliers d'articles</p>
                    </div>
                    <img className="fonctionnement-logo2" src={Logo5} alt="fleche" />
                    <div className="fonctionnement-content">
                        <img className="fonctionnement-logo" src={Logo4} alt="valider la réservation" />
                        <p>Validez votre liste, apportez-la lors de la prochaine permanence</p>
                    </div>
                    <img className="fonctionnement-logo2" src={Logo5} alt="fleche" />
                    <div className="fonctionnement-content">
                        <img className="fonctionnement-logo" src={Logo3} alt="récuperer ses articles" />
                        <p>Récupérez vos articles sur les étagères le jour de la permanence</p>
                    </div>
            </div>

            <div className="categoriesDisplay">
                <div className='content-container--max-width'>
                <h2 className="categorie-title">
                    La matériathèque
                </h2>
                <div className='categorie-box--container'>
                    <div className="categorie-box">
                        <NavLink  className="clay categorie" to="/jeux">
                                <img className="categorie-img" src={Logo6} alt="catégorie"></img>
                        </NavLink>
                        <div>
                        <p>Jeux</p>
                        </div>
                    </div>

                    <div className="categorie-box">
                        <NavLink  className="clay categorie" to="/autonomie">
                                <img className="categorie-img" src={Logo7} alt="catégorie"></img>
                        </NavLink>
                        <div>
                        <p>Autonomie</p>
                        </div>
                    </div>

                    <div className="categorie-box">
                        <NavLink  className="clay categorie" to="/apprentissage">
                                <img className="categorie-img" src={Logo8} alt="catégorie"></img>
                        </NavLink>
                        <div>
                        <p>Apprentissage</p>
                        </div>
                    </div>

                    <div className="categorie-box">
                        <NavLink  className="clay categorie" to="/montessori">
                                <img className="categorie-img" src={Logo9} alt="catégorie"></img>
                        </NavLink>
                        <div>
                        <p>Montessori</p>
                        </div>
                    </div>

                    <div className="categorie-box">
                        <NavLink  className="clay categorie" to="/mediatheque">
                                <img className="categorie-img" src={Logo10} alt="catégorie"></img>
                        </NavLink>
                        <div>
                        <p>Médiathèque</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="actu">
                <div className='content-container--max-width'>
                    <h2 className="actu-title">
                        Nos dernières actualités
                    </h2>
                    <div className="clay actu-post">
                    <img className="actu-img" src={FacebookPost} alt="" />
                    </div>
                    <div className="clay actu-post">
                    <img className="actu-img" src={FacebookPost} alt="" />
                    </div>
                    <div className="clay actu-post">
                    <img className="actu-img" src={FacebookPost} alt="" />
                    </div>
                </div>
            </div>
            <div className="contact-container">
                <div className='content-container--max-width'>
                    <div className="contact-container-coordonnées">
                        <h3>
                        Nous écrire:
                        </h3>
                        <p>
                        8 rue Traverse, 29800 LANDERNEAU
                        </p>
                        <h3>
                        Nous rencontrer:
                        </h3>
                        <p>
                            Place François Mitterrand, 29800 LANDERNEAU
                        </p>
                        <h3>
                            Téléphone
                        </h3>
                        <p>
                            09 51 85 03 55
                        </p>
                        <h3>
                        Email:
                        </h3>
                        <p>
                        ludautisme@gmail.com
                        </p>
                    </div>
                    <div className="contact-container-map">
                    <iframe title="ludo'map" className="contact-container-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.1474306172313!2d-4.257497284157107!3d48.45370073706886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4816b2c241a4e6ab%3A0xe04f55b4d36b897c!2sMaison%20Pour%20Tous%2FCentre%20Social!5e0!3m2!1sfr!2sfr!4v1646304683575!5m2!1sfr!2sfr" loading="lazy"></iframe>
                    </div>
                    <div className="contact-container-contact" >
                        <Contact />
                    </div>
                </div>
            </div>
        </div>


   );
};

Accueil.propTypes = {
    className: PropTypes.string,
};
Accueil.defaultProps = {
    className: '',
};
export default React.memo(Accueil);
