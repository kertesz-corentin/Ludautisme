import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Import components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ContentPage from '../ContentPage/ContentPage';


import './home.scss';

const Home = ({
    className,
    children,
    currentItemsNumber,

}) => {
    console.log(`Résa en cours depuis HOME`, currentItemsNumber)
    return (
        <div className={classnames('home', className)}>
        <ContentPage>
            <Header currentItemsNumber={currentItemsNumber} />
                {children}
            <Footer/>
        </ContentPage>
        </div>
    );
};

Home.propTypes = {
    className: PropTypes.string,
};
Home.defaultProps = {
    className: '',
};
export default React.memo(Home);
