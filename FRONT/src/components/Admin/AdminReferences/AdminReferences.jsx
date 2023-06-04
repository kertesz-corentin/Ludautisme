import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import requests
import api from '../../../requests/index';

// import react components
import AdminSection from '../AdminSection/AdminSection';
import AddReferenceModal from '../AddReferenceModal/AddReferenceModal';
import UpdateReferenceModal from '../UpdateReferenceModal/UpdateReferenceModal';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';
import { referenceSchema } from '../../../Schemas';

// import material ui component
import { IconButton, Button } from '@mui/material';

import './adminreferences.scss';

const AdminReferences = ({ className, ...rest }) => {
    const [references, setReferences] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [alertMessage, setAlertMessage] = useState();

    // config path for api route
    const path = '/admin/references';

    const getReferences = async () => {
        try {
            const response = await api.get('/admin/references');
            const data = await response.data;
            setReferences(data);
        }
        catch (err) {
            setAlertMessage(err.response.data.message)
            console.error(err);
        }
    }

    const getMainCategories = async () => {
        try {
            const response = await api.post('/admin/categorie/search', { "main": true });
            const data = await response.data;
            if (response.status === 200) {
                setCategories(data);
            }
        }
        catch (err) {
            setAlertMessage(err.response.data.message)
            console.error(err);
        }
    }

    const getTags = async () => {
        try {
            const response = await api.post('/admin/categorie/search', { "main": false });
            const data = await response.data;
            if (response.status === 200) {
                setTags(data);
            }
        }
        catch (err) {
            setAlertMessage(err.response.data.message)
            console.error(err);
        }
    }

    useEffect(() => {
        getReferences();
        getMainCategories();
        getTags();
    }, []);

    const columnBuilder = (() => {
        const columns = [];
        Object.keys(referenceSchema).forEach(prop => {
            const propElt = referenceSchema[prop];
            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width
            };

            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
                    case "edit":
                        config.renderCell = (params) => (

                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <UpdateReferenceModal params={params} categories={categories} tags={tags} />
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

    const categoryButton =
        <div className="addreference-modal--open">
            <Button variant="outlined" href="/admin/category">
                Gérer catégories
            </Button>
        </div>


    return (
        <div
            className={classnames('adminreferences', className)}
            {...rest}
        >
            {alertMessage && (
                <AlertMessage message={alertMessage} />
            )}
            <AdminSection
                title="Références"
                rows={references}
                columns={columnBuilder}
                path={path}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id_maincat: false,

                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
                buttonList={[<AddReferenceModal categories={categories} />, categoryButton]}
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
