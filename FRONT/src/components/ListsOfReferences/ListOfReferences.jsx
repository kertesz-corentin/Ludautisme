import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ListOfReferences = ({className, ...rest}) => {
    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="70%">
            <Stack spacing={2}>
                <Pagination count={10} color="primary" />
            </Stack>
            <Box className= "lisofreferences" />
            Voici la list des réferences
            <Reference/>
            <Reference/>
            <Reference/>
            <Reference/>
            <Stack spacing={2}>
                <Pagination count={10} color="primary" />
            </Stack>
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
