import React from 'react';
import PropTypes from 'prop-types';
import './available.scss';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';

const Available = ({
    className,
    nbAvailable,
    nbTotal,
     ...rest}) => {
   return (
    <Stack direction="row" spacing={8}>
    <Avatar sx={{ bgcolor: green[500], fontSize: 10, p:2, width:100 }} variant="rounded">
     {(nbAvailable && nbTotal) &&
        `${nbAvailable}/${nbTotal}`
     }

      {` Disponible${(nbAvailable>1)?'s':''}`}
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
