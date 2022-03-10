import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './updatemodal.scss';

const UpdateModal = ({className, ...rest}) => {
   return (
       <div
            className={classnames('updatemodal', className)}
            {...rest}
         >

        </div>
   );
};

UpdateModal.propTypes = {
    className: PropTypes.string,
};
UpdateModal.defaultProps = {
    className: '',
};
export default React.memo(UpdateModal);
