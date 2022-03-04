import React from 'react';
import PropTypes from 'prop-types';
import './contentpage.scss';

const ContentPage = ({children}) => {
    return (
        <main className='contentpage'>
            {children}
        </main>
    );
};

ContentPage.propTypes = {
    className: PropTypes.string,
};
ContentPage.defaultProps = {
    className: '',
};
export default React.memo(ContentPage);
