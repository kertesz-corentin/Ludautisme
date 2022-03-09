import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NextPages from '../NextPages/NextPages';



const ListOfReferences = ({className, ...rest}) => {
    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="70%">
            <Box className= "lisofreferences" />
            <Reference/>
            <Reference/>
            <Reference/>
            <Reference/>
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
