import React from 'react';
import { Paper } from '@mui/material';
import logo from '../public/logo.png';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './homepage.scss';
import { NavLink } from "react-router-dom";

const Accueil = ({className, ...rest}) => {
    return (

        <div className={classnames('accueil', className)}
        {...rest}>
            <div className="bandeau-présentation">
                <div className="bandeau-présentation-texte">
                <h2>Bienvenue chez lud'Autisme</h2>
                <p>
                    Location de jeux et matériel éducatifs pour les personnes en difficultés d'apprentissage
                </p><br />
                <p>
                    Pour les particuliers adhérents et les professionels partenaires
                </p><br />
                </div>
                <div className="bandeau-présentation-permanence">
                    <Paper elevation={20}>
                        <h2 className="bandeau-présentation-permanence-title">
                            Prochaine permanence
                        </h2>
                        <p className="bandeau-présentation-permanence-infos">
                            jj/mm/aaaa <br/>
                            de hh à hh <br/>
                        </p>
                    </Paper>
                </div>

            </div>
            <div className="categoriesDisplay">
                <div className="categorie">
                    <NavLink to="/Jeux">
                        <Paper elevation={12} >
                            <img src={logo} className="header-logo-image" alt="Logo" />
                        </Paper>
                    </NavLink>
                    Jeux
                </div>
                <div className="categorie">
                    <NavLink to="/Jeux">
                        <Paper elevation={12} >
                            <img src={logo} className="header-logo-image" alt="Logo" />
                        </Paper>
                    </NavLink>
                    Autonomie
                </div>
                <div className="categorie">
                    <NavLink to="/Jeux">
                        <Paper elevation={12} >
                            <img src={logo} className="header-logo-image" alt="Logo" />
                    </Paper>
                    </NavLink>
                    Apprentissage
                </div>
                <div className="categorie">
                    <NavLink to="/Jeux">
                        <Paper elevation={12} >
                            <img src={logo} className="header-logo-image" alt="Logo" />
                        </Paper>
                    </NavLink>
                    Montessori
                </div>
                <div className="categorie">
                    <NavLink to="/Jeux">
                        <Paper elevation={12} >
                            <img src={logo} className="header-logo-image" alt="Logo" />
                        </Paper>
                    </NavLink>
                    Médiathèque
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
