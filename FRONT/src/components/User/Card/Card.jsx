import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './card.scss';

const Card = ({className, ...rest}) => {
   return (
       <div
            className={classnames('card', className)}
            {...rest}
         >

        </div>
   );
};

Card.propTypes = {
    className: PropTypes.string,
};
Card.defaultProps = {
    className: '',
};
export default React.memo(Card);
