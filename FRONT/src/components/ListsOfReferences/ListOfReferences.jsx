import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './listofreferences.scss';
import Reference from '../Reference/Reference';

const ListOfReferences = ({className, ...rest}) => {
   return (
       <div
            className={classnames('listofreferences', className)}
            {...rest}
         >
            Voila la liste des réferences
            <Reference/>
        </div>
   );
};

ListOfReferences.propTypes = {
    className: PropTypes.string,
};
ListOfReferences.defaultProps = {
    className: '',
};
export default React.memo(ListOfReferences);
