import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './addmodal.scss';

const AddModal = ({className, ...rest}) => {
   return (
       <div
            className={classnames('addmodal', className)}
            {...rest}
         >

        </div>
   );
};

AddModal.propTypes = {
    className: PropTypes.string,
};
AddModal.defaultProps = {
    className: '',
};
export default React.memo(AddModal);
