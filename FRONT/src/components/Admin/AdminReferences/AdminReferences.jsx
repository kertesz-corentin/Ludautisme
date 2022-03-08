import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import api from '../../../requests/index';
import { referenceSchema } from '../../../Schemas';


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

    const columnsData = [
        {field: 'name', headerName: 'Nom', width: 200},
        {field: 'description', headerName: 'Description', width: 350},
        {field: 'valorisation', headerName: 'Valorisation', width: 100},
        {field: 'mainCategory', headerName: 'Catégorie', width: 200},
        {field: 'tag', headerName: 'Tags', width: 200}
    ]

   return (
       <div
            className={classnames('adminreferences', className)}
            {...rest}
         >
            <AdminSection
                title="Référence"
                rows={references}
                columns={columnsData}
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
