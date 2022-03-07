import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import api, { getLocalBearerToken } from '../../../requests';

// import scss
import './adminreferences.scss';

const AdminReferences = ({className, ...rest}) => {
    const [references, setReferences] = useState([]);
    const adminToken = getLocalBearerToken();

    const getReferences = async () => {
        try {
            const response = await api.get('admin/references', {
                headers: {
                    Authorization: `bearer ${adminToken}`
                }
            })
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

    const rowsData = references.map(reference => {
        return {
            id: reference.id,
            name: reference.name,
            description: reference.description,
            valorisation: reference.valorisation,
            mainCategory: reference.mainCategory,
            tag: reference.tag,
        }
    })

   return (
       <div
            className={classnames('adminreferences', className)}
            {...rest}
         >
            <AdminSection
                title="Référence"
                rows={rowsData}
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
