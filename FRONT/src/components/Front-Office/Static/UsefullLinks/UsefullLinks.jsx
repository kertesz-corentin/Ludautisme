import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './usefulllinks.scss';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Souris from '../../../../public/icones/souris.png'
import { Box } from '@mui/material';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1rem', color: 'black' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgb(255, 251, 236)',
    width: '95%',
    borderRadius: '10px',
    margin: '10px',
    //   theme.palette.mode === 'dark'
    //     ? 'rgba(255, 255, 255, .05)'
    //     : 'rgb(250, 150, 0)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



const UsefullLinks = ({ className, ...rest }) => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <div className={classnames('UsefullLinks', className)}
            {...rest}
        >
            <div className='UsefullLinks-présentation'>
                <p className='clay UsefullLinks-présentation-texte'>
                    <img className='UsefullLinks-présentation-texte-logo' src={Souris} alt="liens externes" />
                    Voici une liste de liens, non exhaustive, qui peut vous aider dans vos démarches au quotidien
                </p>
            </div>
            <div className='UsefullLinks-links'>
                <Box className='UsefullLinks-container'>
                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Ressources Lud’autisme</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.dropbox.com/sh/6guum6zx8fgvkml/AABzccnKwiRkHkCN9Oonuwt9a?dl=0">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Apprentissage et autonomie
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.dropbox.com/sh/nwgjzb0nmbnumqd/AACciwEtE-5H57-CUC6mctNoa?dl=0">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme et inclusion
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.dropbox.com/sh/63123ok2m70f2b8/AABN_M5PUx7FD-ohdFPzXCqda?dl=0">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            DYS
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.dropbox.com/sh/2e81tkwbcbmsr64/AACEBOPhEhJXiAwxQsbUUrRCa?dl=0">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            TDA/H
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>



                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Banques de pictogrammes</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.arasaac.org/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Arasaac
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.pictofrance.fr/Picto.aspx/catalogue">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Pictofrance
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://do2learn.com/picturecards/printcards/index.htm">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Do2learn
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.sclera.be/fr/vzw/home">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Sclera
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://infovisual.info/fr">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Dictionnaire visuel
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.sparadrap.org/enfants/dictionnaire">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Dictionnaire de la santé
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.lespictogrammes.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Lespictogrammes ( <AttachMoneyRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon2' /> payant)
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.axelia.com/Pictogrammes.htm">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Axelia (<AttachMoneyRoundedIcon className='UsefullLinks-links-navlink-icon2' />payant)
                                        </a >
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.hoptoys.fr/recherche?controller=search&orderby=position&orderway=desc&search_query=ideo+pictos&submit_search=">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Hoptoys (<AttachMoneyRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon2' />payant)
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Applications pour l’autonomie</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.pictoselector.eu/fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Picto-selector
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.arasaac.org/software.php">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Aulaabierta Arasaac
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.dyslogiciel.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Dyslogiciel
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://auticiel.com/applications/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Auticiel (<AttachMoneyRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon2' />payant)
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.assistiveware.com/fr/produits">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Assistiveware (<AttachMoneyRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon2' />payant)
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Centre de Ressources Autisme Bretagne</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.cra.bzh/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            CRA Bretagne
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.cra.bzh/boite-a-outils?fbclid=IwAR01viKYsOdXebvEKmeFWyzNH-edeViX2fC5eBZZuekSj0y5QIdUM-jFNiI">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Boite à outils du CRA
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://padlet.com/crabretagne/outils_vie_quotidienne">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Padlets de ressources du CRA Bretagne:
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Principales associations nationales pour l’autisme</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.arapi-autisme.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Arapi
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://aspergeraide.com/index.php">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Asperger Aide France
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.autisme-espoir.org/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme Espoir Vers l'École
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://autismeinfantile.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme Infantile
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.autistessansfrontieres.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autistes Sans Frontieres
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.participate-autisme.be/fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Participate Autism (association belge)
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.sesame-autisme.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Sesame Autisme
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Associations bretonnes pour l’autisme</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://tsa-finistere.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            TSA Finistère
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.asperansa.org/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Asperansa
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://autismebreizha.canalblog.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme Breizh Autonomie
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href=" https://autismecornouaille.wordpress.com/autisme-cornouaille/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme Cornouaille
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.autisme-emeraude.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme Côte d’Emeraude
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://autisme-tregorgoelo.ovh/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme Trégor Goëlo
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.facebook.com/FISSA-Autisme-312011465846903/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            FISSA Autisme <FacebookRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon3' />
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://pmmca.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Pmmca
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.facebook.com/pg/Clpm-autisme-808807706121099/community/?ref=page_internal">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Clpm autisme <FacebookRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon3' />
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Vente de matériel éducatif </p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.autismediffusion.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme Diffusion
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.autisme-apprentissages.org/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Autisme apprentissages
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.celda.fr/index.a4d">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Asco & Celda
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.hoptoys.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Hop'toys
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.lemondedujouetenbois.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Le Monde Du Jouet En Bois
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.lesenfants.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Les Enfants De Dialogues
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.mot-a-mot.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Mot à Mot
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://materiel-educatif.nathan.fr/dme/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Matériel éducatif Nathan
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.oppa-montessori.net/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Oppa Montessori
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.wesco.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Wesco
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>
                                Sites ou blogs de mamans ou d’instituteurs <br />
                                très riches en idées d’activités pour faire travailler nos enfants</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://sacnat.eklablog.fr/accueil-c20865257">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Le Sac de Nat
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://ecouterlautisme.blogspot.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Ecouter l'autisme
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://blogthomas.over-blog.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Blog de Thomas "montithom"
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://lepetitroi.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Le petit roi
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://blogclemence.canalblog.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Clémence Cazenave Tapie
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://laclassededelphine.jimdo.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            L aclasse de Delphine
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>
                                Descriptions des principales méthodes, traitement, outils… <br />
                                de prise en charge pour enfants autistes</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.autisme-espoir.org/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Méthode des 3i
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.pecs-france.fr/WhatsPECS.php">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Méthode PECS®
                                        </a>
                                        {/* <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.autisme.qc.ca/TED/programmes-et-interventions/methodes-educatives/quest-ce-que-le-programme-teacch.html">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Programme TEACCH
                                        </a> */}
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.autismtreatmentcenter.org/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Programme Son-Rise  (site en anglais)
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://pasapasfinistere.free.fr/http___pasapasfinistere.free.fr/Quest-ce_que_lABA.html">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Traitement ABA
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.makaton.org/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Makaton (site en anglais)
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Organismes proposant des formations aux professionnels et/ou aux parents</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://autismeformation.free.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Ediformation
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://eduscol.education.fr/cid61219/modules-de-formation-pour-les-enseignants.html">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Éduscol
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.inshea.fr/fr">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Inshea
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.abaautisme.org/formation/france-handicap-formation">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Aba autisme
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Les droits</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://autisme.asperger.free.fr/agir.php">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Agir vite : les différentes étapes à suivre
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.mdph29.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            MDPH Du Finistère
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="https://www.sais92.fr/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            SAIS 92
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="UsefullLinks-links-box" expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='UsefullLinks-links-title'>Magazines</p>
                        </AccordionSummary>
                        <AccordionDetails>
                                <ul className='UsefullLinks-links-ul'>
                                    <li className='UsefullLinks-links-li'>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://www.magazine-declic.com/">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Declic
                                        </a>
                                        <a target="_blank" rel="noreferrer" className='UsefullLinks-links-navlink' href="http://grouperechercheautismemontreal.ca/Magazine.aspx">
                                            <LinkRoundedIcon fontSize="small" className='UsefullLinks-links-navlink-icon' />
                                            Sur le spectre
                                        </a>
                                    </li>
                                </ul>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </div>
        </div>
    );
};

UsefullLinks.propTypes = {
    className: PropTypes.string,
};
UsefullLinks.defaultProps = {
    className: '',
};
export default React.memo(UsefullLinks);
