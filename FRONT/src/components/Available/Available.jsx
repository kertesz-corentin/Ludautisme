import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './available.scss';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Available = ({className, ...rest}) => {
   return (
    <Stack direction="row" spacing={8}>
    <Avatar sx={{ bgcolor: green[500], fontSize: 10, p:2, width:80 }} variant="rounded">
      Disponible
    </Avatar>
  </Stack>
)
};

Available.propTypes = {
    className: PropTypes.string,
};
Available.defaultProps = {
    className: '',
};
export default React.memo(Available);
