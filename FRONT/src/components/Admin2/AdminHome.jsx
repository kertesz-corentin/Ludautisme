import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './home.scss';
import PropTypes from 'prop-types';
// import { Box } from '@mui/material';
import Header from './AdminHeader/AdminHeader';
import Content from './Content/Content';

function Home({ content }) {
    return (
        <div className="home">
            <Header />
            <Content content={content} />
        </div>
    );
}

Home.propTypes = {
    content: PropTypes.element,
};

Home.defaultProps = {
    content: PropTypes.element,
};

export default React.memo(Home);
