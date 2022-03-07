import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './homepage.scss';
import { NavLink } from "react-router-dom";
import Permanency from '../Permanency/Permanency';
import "claymorphism-css/dist/clay.scss";
import Logo1 from "../public/icones/bloguer.png";
import Logo2 from "../public/icones/commerce-electronique.png";
import Logo3 from "../public/icones/magasin.png";
import Logo4 from "../public/icones/check.png";
import Logo5 from "../public/icones/arrow.png";
import Logo6 from "../public/icones/echecs.png";
import Logo7 from "../public/icones/fusee.png";
import Logo8 from "../public/icones/idee.png";
import Logo9 from "../public/icones/puzzle.png";
import Logo10 from "../public/icones/signet.png";
import FacebookPost from "../public/facebook-post.png";
import Contact from '../Contact/Contact';

const Accueil = ({className, ...rest}) => {
    return (
        <div className={classnames('accueil', className)}
        {...rest}>
            <div className="bandeau-présentation">
                <div className="bandeau-présentation-texte">
                <h2>Bienvenue chez lud'Autisme</h2>
                <p>
                    Location de jeux et matériels éducatifs pour les personnes en difficultés d'apprentissage. <br />
                    Pour les particuliers adhérents et les professionnels partenaires. <br />
                </p>
                </div>
                <div className="bandeau-présentation-permanence">
                        <p>
                            <Permanency />
                        </p>
                </div>
            </div>

            <div className="fonctionnement">
                <h2 className="fonctionnement-title">Comment ça marche?</h2>
                    <div className="fonctionnement-content">
                            <img className="fonctionnement-logo" src={Logo1} alt="s'incrire" />
                        <p>S'inscrire en tant qu'adhérent auprès de l'association</p>
                    </div>
                    <img className="fonctionnement-logo2" src={Logo5} alt="fleche" />
                    <div className="fonctionnement-content">
                        <img className="fonctionnement-logo" src={Logo2} alt="sélectionner les articles" />
                        <p>Sélectionner les articles que vous souhaitez réserver</p>
                    </div>
                    <img className="fonctionnement-logo2" src={Logo5} alt="fleche" />
                    <div className="fonctionnement-content">
                        <img className="fonctionnement-logo" src={Logo4} alt="valider la réservation" />
                        <p>Valider la réservation de ces articles</p>
                    </div>
                    <img className="fonctionnement-logo2" src={Logo5} alt="fleche" />
                    <div className="fonctionnement-content">
                        <img className="fonctionnement-logo" src={Logo3} alt="récuperer ses articles" />
                        <p>Récuperer vos articles le jour de la permanence</p>
                    </div>
            </div>

            <div className="categoriesDisplay">
                <h2 className="categorie-title">
                    La matériathèque
                </h2>

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



                {/* <div className="clay categorie">
                    <NavLink to="/Jeux">
                            <div className="categorie-img2"></div>
                    </NavLink>
                    <p>Autonomie</p>
                </div>
                <div>
                    <div className="clay categorie">
                        <NavLink to="/Jeux">
                                <div className="categorie-img3"></div>
                        </NavLink>
                        <p>Apprentissage</p>
                    </div>
                </div>
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                         <div className="categorie-img4"></div>
                    </NavLink>
                    <p>Montessori</p>
                </div>
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                         <div className="categorie-img5"></div>
                    </NavLink>
                    <p>Médiathèque</p>
                </div> */}
            </div>
            <div className="actu">
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
            <div className="contact-container">
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
                        Place François Mitterand, 29800 LANDERNEAU
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
                <div >
                    <Contact />
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
