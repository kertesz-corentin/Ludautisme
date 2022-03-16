import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './listofbookings.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NextPages from '../NextPages/NextPages';
import { Grid, Paper, Accordion,AccordionSummary,AccordionDetails,Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ListOfBookings = ({
    className,
    bookings,
     ...rest
    }) => {
    console.log(bookings);
    return (
        bookings ?
        <React.Fragment>
        {(bookings) &&
                    bookings.map((booking,index) => (
                        <Accordion className = "booking__accordion">
                             <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}a-header`}
                                id={`panel${index}a-header`}

                                >
                                    <Typography>#{booking.id} - {booking.references.length} article(s) Du {booking.date_permanency} au {booking.return_date_permanency}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                            </AccordionDetails>
                        {console.log(booking)}
                        {console.log(booking.id,booking.delivered,booking.closed,booking.references.length,booking.overdue)}
                        </Accordion>
                    ))
        }
        </React.Fragment>
        :
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="70%">
            <Box className= "lisofreferences" />

          </Container>
        </React.Fragment>
      );
};

ListOfBookings.propTypes = {
    className: PropTypes.string,
};
ListOfBookings.defaultProps = {
    className: '',
};
export default React.memo(ListOfBookings);
