import React from 'react';
import { Paper } from '@mui/material';
import logo from '../Header/logo.png';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './accueil.scss';
import Header from '../Header/Header';
import { NavLink } from "react-router-dom";

const Accueil = ({className, ...rest}) => {
    return (
        <div className={classnames('accueil', className)}
        {...rest}>
            <Header/>
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

