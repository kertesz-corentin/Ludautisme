import React from 'react';
import PropTypes from 'prop-types';
import './unavailable.scss';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange} from '@mui/material/colors';


const Unavailable = ({className, ...rest}) => {
   return (
        <Stack direction="row" spacing={8}>
        <Avatar sx={{ bgcolor: deepOrange[500], fontSize: 10, p:2, width:80, borderRadius:"25px" }} variant="rounded">
          Indisponible
        </Avatar>
      </Stack>
    )

};

Unavailable.propTypes = {
    className: PropTypes.string,
};
Unavailable.defaultProps = {
    className: '',
};
export default React.memo(Unavailable);
