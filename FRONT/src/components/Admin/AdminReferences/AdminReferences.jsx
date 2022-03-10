import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconButton } from '@mui/material';
import AdminSection from '../AdminSection/AdminSection';
import api from '../../../requests/index';
import { referenceSchema } from '../../../Schemas';
import AddReferenceModal from '../AddReferenceModal/AddReferenceModal';
import UpdateReferenceModal from '../UpdateReferenceModal/UpdateReferenceModal';


// import scss
import './adminreferences.scss';

const AdminReferences = ({className, ...rest}) => {
    const [references, setReferences] = useState([]);
    const [categories, setCategories] = useState([]);

    // config path for api route
    const path = '/admin/references';

    const getReferences = async () => {
        try {
            const response = await api.get('/admin/references');
            const data = await response.data;
            setReferences(data);
            console.log('references', data);
        }
        catch (err) {
            console.error (err);
        }
    }

    const getMainCategories = async () => {
        try {
            const response = await api.post('/admin/categorie/search', {"main": true});
            const data = await response.data;
            setCategories(data);
            console.log('categories', data)
        }
        catch (err) {
            console.error (err);
        }
    }

    useEffect(() => {
        getReferences();
        getMainCategories();
    }, []);

    const columnBuilder = (() => {
        const columns = [];
        Object.keys(referenceSchema).forEach(prop => {
            const propElt = referenceSchema[prop];
            const config = {
                type: propElt.type,
                field:prop,
                headerName:propElt.label,
                width: propElt.width
            };

            if (propElt.gridDisplay !== "normal"){
                switch (propElt.gridDisplay){
                    case "edit":
                        config.renderCell = (params) => (

                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <UpdateReferenceModal params={params} categories={categories} />
                            </IconButton>
                        );
                    break;

                    default:
                        break;
                }
            }
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
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        // Hide columns <column name>, the other columns will remain visible

                      },
                    },
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
                children={<AddReferenceModal categories={categories} />}
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
