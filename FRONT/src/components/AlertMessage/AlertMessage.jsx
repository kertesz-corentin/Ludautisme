import React from 'react';
import PropTypes from 'prop-types';

// import material ui components
import Alert from '@mui/material/Alert';

import './alertmessage.scss';

const AlertMessage = ({message, severity}) => {
    return (
        <Alert
            variant='outlined'
            severity={(severity)? severity : 'error'}
        >
            {message}
        </Alert>
    );
};

AlertMessage.propTypes = {
    className: PropTypes.string,
};
AlertMessage.defaultProps = {
    className: '',
};
export default React.memo(AlertMessage);
