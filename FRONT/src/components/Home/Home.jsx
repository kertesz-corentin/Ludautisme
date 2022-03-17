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
    currentItems,


}) => {
    return (
        <div className={classnames('home', className)}>
        <Header currentItemsNumber={currentItemsNumber}  currentItems = {currentItems} />
        <ContentPage>
                {children}
        </ContentPage>
        <Footer />
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
