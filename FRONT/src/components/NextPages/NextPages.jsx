import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import  PropTypes from 'prop-types';

const NextPages = ({className, ...rest}) => {
   return (
    <Stack className="nextPage" spacing={2}>
        <Pagination className="nextPage-pagination"
                    count={10}
                    color="primary"
                    sx={{justifyContent:"center"}} />
    </Stack>
   );
};

NextPages.propTypes = {
    className: PropTypes.string,
};
NextPages.defaultProps = {
    className: '',
};
export default React.memo(NextPages);
