import React from 'react';
import { Paper } from '@mui/material';
import logo from '../public/logo.png';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './homepage.scss';
import { NavLink } from "react-router-dom";
import legos from '../public/legos.gif';
import legosfix from '../public/legosfix.png';
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
                    {/* <Paper elevation={12}> */}
                        <p className="clay card">
                            <Permanency />
                        </p>
                    {/* </Paper> */}
                </div>

            </div>
            <div className="categoriesDisplay">
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                        {/* <Paper elevation={12} > */}
                            <div className="categorie-img1"></div>
                            {/* <img src={legosfix} className="categorie-img" alt="Logo" /> */}
                            {/* <img src={legos} className="categorie-img-gif" alt="Logo" /> */}
                        {/* </Paper> */}
                    </NavLink>
                    <p>Jeux</p>
                </div>
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                        {/* <Paper elevation={12} > */}
                            <div className="categorie-img2"></div>
                            {/* <img src={logo} className="categorie-img" alt="Logo" /> */}
                        {/* </Paper> */}
                    </NavLink>
                    <p>Autonomie</p>
                </div>
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                        {/* <Paper elevation={12} > */}
                            <div className="categorie-img3"></div>
                            {/* <img src={logo} className="categorie-img" alt="Logo" /> */}
                    {/* </Paper> */}
                    </NavLink>
                    <p>Apprentissage</p>
                </div>
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                        {/* <Paper elevation={12} > */}
                         <div className="categorie-img4"></div>
                            {/* <img src={logo} className="categorie-img" alt="Logo" /> */}
                        {/* </Paper> */}
                    </NavLink>
                    <p>Montessori</p>
                </div>
                <div className="clay categorie">
                    <NavLink to="/Jeux">
                        {/* <Paper elevation={12} > */}
                         <div className="categorie-img5"></div>
                            {/* <img src={logo} className="categorie-img" alt="Logo" /> */}
                        {/* </Paper> */}
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
