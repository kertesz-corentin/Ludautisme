import React from 'react';
import PropTypes from 'prop-types';

import './adminhomecard.scss';

const AdminHomeCard = ({title, data, status, tag, className, ...rest}) => {
    return (
        <div className={`adminhomecard adminhomecard-${tag}`}>
            <h2 className='adminhomecard-title'>{title}</h2>
            <div className='adminhomecard-content'>
                <span className='adminhomecard-content-element adminhomecard-content-element--data'>{data}</span>
                <span className='adminhomecard-content-element adminhomecard-content-element--category'>{status}</span>
            </div>
        </div>
    );
};

AdminHomeCard.propTypes = {
    className: PropTypes.string,
};
AdminHomeCard.defaultProps = {
    className: '',
};
export default React.memo(AdminHomeCard);
