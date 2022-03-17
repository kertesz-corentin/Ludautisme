import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NextPages from '../NextPages/NextPages';
import { Grid, Paper } from '@mui/material';
import { useContext } from 'react';




const ListOfReferences = ({
    className,
    references,
    display,
    currentItems,
     ...rest
    }) => {
        console.log(references);
    return (
        references ?
        <React.Fragment>
          <CssBaseline />
          <Grid
            className = "gridList"
            container
            direction="row"
            justifyContent="flex-start"
            alignContent="flex-start"
            alignItems="center"
        >
                {references.map((reference,index)=>
                (
                    <Reference
                        currentItems={currentItems}
                        display={display}
                        key = {`${reference.id}-${index}`}
                        id={reference.id}
                        result= {reference.id}
                        name={reference.name}
                        description={reference.description}
                        maincategory={reference.maincategory}
                        picture={reference.picture}
                        tag={reference.tag}
                        valorisation={reference.valorisation}
                        nb_available={reference.nb_available}
                        nb_total={reference.nb_total}
                    />

                )

            )}
            </Grid>
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

ListOfReferences.propTypes = {
    className: PropTypes.string,
};
ListOfReferences.defaultProps = {
    className: '',
};
export default React.memo(ListOfReferences);
