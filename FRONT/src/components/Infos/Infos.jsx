import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './infos.scss';

const Infos = ({className, ...rest}) => {
   return (
       <div
            className={classnames('infos', className)}
            {...rest}
         >
            Infos
        </div>
   );
};

Infos.propTypes = {
    className: PropTypes.string,
};
Infos.defaultProps = {
    className: '',
};
export default React.memo(Infos);
