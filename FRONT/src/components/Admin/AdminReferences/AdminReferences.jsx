import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import api from '../../../requests/index';
import { referenceSchema } from '../../../Schemas';
import AddReferenceModal from '../AddReferenceModal/AddReferenceModal';


// import scss
import './adminreferences.scss';

const AdminReferences = ({className, ...rest}) => {
    const [references, setReferences] = useState([]);

    // config path for api route
    const path = '/admin/references';

    const getReferences = async () => {
        try {
            const response = await api.get('admin/references');
            const data = await response.data;
            setReferences(data);
        }
        catch (err) {
            console.error (err);
        }
    }

    useEffect(() => {
        getReferences();
    }, []);

    const columnBuilder = (() => {
        const columns = [];
        Object.keys(referenceSchema).forEach(prop => {
            const propElt = referenceSchema[prop];
            const config = {
                type: propElt.type,
                field:prop,
                headerName:propElt.label,
                width: propElt.width};
            columns.push(config);
        });
        return columns;
    })();

   return (
       <div
            className={classnames('adminreferences', className)}
            {...rest}
         >
            <AdminSection
                title="Référence"
                rows={references}
                columns={columnBuilder}
                path={path}
                children={<AddReferenceModal />}
            />
        </div>
   );
};

AdminReferences.propTypes = {
    className: PropTypes.string,
};
AdminReferences.defaultProps = {
    className: '',
};
export default React.memo(AdminReferences);
