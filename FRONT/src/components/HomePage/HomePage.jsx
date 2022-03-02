import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './homepage.scss';
import { NavLink } from "react-router-dom";
import Permanency from '../Permanency/Permanency';
import "claymorphism-css/dist/clay.scss";

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
                        {/* <div className="clay img"></div> */}
                        <img src="../public/icones/bloguer.png" alt="icone s'inscrire" />
                        <p>S'inscrire en tant qu'adhérent auprès de l'association</p>
                    </div>
                    <div className="fonctionnement-content">
                        <p>Sélectionner les articles que vous souhaitez réserver</p>
                    </div>
                    <div className="fonctionnement-content">
                        <p>Valider la réservation de ces articles</p>
                    </div>
                    <div className="fonctionnement-content">
                        <p>Venez récuperer vos articles le jour de la permanence</p>
                    </div>
            </div>

            <div className="categoriesDisplay">
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
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                            <div className="categorie-img3"></div>
                    </NavLink>
                    <p>Apprentissage</p>
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
