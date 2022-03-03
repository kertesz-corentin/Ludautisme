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
import FacebookPost from "../public/facebook-post.png";

const Accueil = ({className, ...rest}) => {
    return (

        <div className={classnames('accueil', className)}
        {...rest}>
            <div className="bandeau-présentation">
                <div className="bandeau-présentation-texte">
                <h2>Bienvenue chez lud'Autisme</h2>
                <p>
                    Location de jeux et matériel éducatifs pour les personnes en difficultés d'apprentissage <br />
                    Pour les particuliers adhérents et les professionels partenaires <br />
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
                        <p>Venez récuperer vos articles le jour de la permanence</p>
                    </div>
            </div>

            <div className="categoriesDisplay">
                <h2 className="categorie-title">
                    La matériathèque
                </h2>
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                            <div className="categorie-img1"></div>
                    </NavLink>
                    <p>Jeux</p>
                </div>
                <div className="clay categorie">
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
                </div>
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
