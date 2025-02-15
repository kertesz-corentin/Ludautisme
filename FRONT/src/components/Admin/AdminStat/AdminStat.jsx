import PropTypes from 'prop-types';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UserStat from '../UserStat/UserStat';
import ArticleStat from '../ArticleStat/ArticleStat';
import CategoryStat from '../CategoryStat/CategoryStat';
import BookingStat from '../BookingStat/BookingStat';

const AdminStat = ({ className, ...rest}) => {
    return (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Utilisateurs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <UserStat></UserStat>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Jeux les plus empruntés</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ArticleStat></ArticleStat>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Catégories les plus empruntés</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CategoryStat></CategoryStat>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Emprunts par mois</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <BookingStat></BookingStat>
            </AccordionDetails>
          </Accordion>
        </div>
      );
}

AdminStat.propTypes = {
    className: PropTypes.string,
};
AdminStat.defaultProps = {
    className: '',
};

export default React.memo(AdminStat);
