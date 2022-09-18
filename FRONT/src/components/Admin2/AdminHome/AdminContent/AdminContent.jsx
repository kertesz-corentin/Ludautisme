/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './admincontent.scss';

function Content({ content }) {

    return (
        <div className="content">
            {content}
        </div>
    );
}

Content.propTypes = {
    content: PropTypes.element,
};

Content.defaultProps = {
    content: PropTypes.element,
};

export default React.memo(Content);
