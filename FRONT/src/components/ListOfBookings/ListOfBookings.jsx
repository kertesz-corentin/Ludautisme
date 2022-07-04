import React from 'react';
import PropTypes from 'prop-types';
import './listofbookings.scss';
import CssBaseline from '@mui/material/CssBaseline';
import { Box,Container,Accordion,AccordionSummary,AccordionDetails,Typography } from '@mui/material'
import ListOfReferences from '../ListsOfReferences/ListOfReferences';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ListOfBookings = ({
    className,
    bookings,
     ...rest
    }) => {
    console.log(bookings);
    return (
        bookings ?
        <Box className='booking__container'>
        {(bookings) &&
                    bookings.map((booking,index) => (
                        <Accordion className = "booking__accordion">
                             <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}a-header`}
                                id={`panel${index}a-header`}

                                >
                                    <Typography>#{booking.id} - {booking.references.length} article(s) Du {booking.date_permanency.substring(2)} au {booking.return_date_permanency.substring(2)}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                             <ListOfReferences
                                    display="booking"
                                    references= {booking.references}
                                    gridSize={300}
                                />
                            </AccordionDetails>
                        {console.log(booking)}
                        {console.log(booking.id,booking.delivered,booking.closed,booking.references.length,booking.overdue)}
                        </Accordion>
                    ))
        }
        </Box>
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
