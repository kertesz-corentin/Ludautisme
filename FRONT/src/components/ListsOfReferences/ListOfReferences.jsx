import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NextPages from '../NextPages/NextPages';
import { Grid, Paper } from '@mui/material'


const ListOfReferences = ({
    className,
    references,
     ...rest
    }) => {
        console.log("ref",references)
    return (
        references ?
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="70%">
          <Grid
            container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        >

                {references.map((reference,index)=>
                (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                    <Reference
                        key = {reference.id}
                        name={reference.name}
                        description={reference.description}
                        maincategory={reference.maincategory}
                        picture={reference.picture}
                        tag={reference.tag}
                        valorisation={reference.valorisation}
                    />
                    </Grid>
                ))
                }
            </Grid>
          </Container>
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
