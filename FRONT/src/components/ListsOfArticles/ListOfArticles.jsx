import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './listofarticles.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NextPages from '../NextPages/NextPages';
import { Grid, Paper } from '@mui/material'


const ListOfArticles = ({
    className,
    articles,
     ...rest
    }) => {
        console.log("ref",articles)
    return (
        articles ?
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="70%">
          <Grid
            container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        >

                {articles.map((article,index)=>
                (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                    <Reference
                        key = {article.id_ref}
                        name={article.name_ref}
                        description={article.description_ref}
                        url_picture={article.url_picture_ref}
                        text_picture={article.text_picture_ref}
                    />
                    </Grid>
                )
            )}
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

ListOfArticles.propTypes = {
    className: PropTypes.string,
};
ListOfArticles.defaultProps = {
    className: '',
};
export default React.memo(ListOfArticles);
