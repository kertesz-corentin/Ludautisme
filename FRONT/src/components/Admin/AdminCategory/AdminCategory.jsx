import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';
import AdminSection from '../AdminSection/AdminSection';
import AddCategoryModal from '../AddCategoryModal/AddCategoryModal';
import { IconButton, ToggleButton } from '@mui/material';
import { GridCheckIcon } from '@mui/x-data-grid';
import { categorySchema } from '../../../Schemas';
import PropTypes from 'prop-types';
import api from '../../../requests';

const AdminCategory = ({ className, ...rest }) => {
    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();
    const [categories, setCategories] = React.useState ([]);
    const [tags, setTags] = React.useState ([]);

    let path = '/admin/categorie/search';
    const getMainCategories = async () => {
        try {
            let options = {
                main: true
            }
            const response = await api.post(path, options);
            const data = await response.data;
            console.log(response)
            if (response.status === 200) {

                setCategories(data);
            } else {
                setAlertMessage(response.data.message);
            }
        } catch (err) {
            setAlertMessage(err.response.data.message)
            console.error(err);
        }
    }

    const getTags = async () => {
        try {
            const response = await api.post(path);
            const data = await response.data;
            if (response.status === 200) {
                setTags(data);
            }
        } catch (err) {
            setAlertMessage(err.response.data.message)
            console.error(err);
        }
    }

    useEffect(() => {
        getMainCategories();
        getTags();
    }, []);

    const columnBuilder = (() => {
        const columns = [];
        Object.keys(categorySchema).forEach(prop => {
            const propElt = categorySchema[prop];
            const config = {
                type: propElt.type,
                field:prop,
                headerName:propElt.label,
                width: propElt.width};

            if (propElt.gridDisplay !== "normal"){
                switch (propElt.gridDisplay){
                    case "toggle":
                        config.renderCell = (params) => (
                            <ToggleButton
                                value={params.value}
                                selected={params.value}
                                onChange={async () => {
                                }}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <GridCheckIcon />
                            </ToggleButton>
                    );
                    break;
                    case "edit":
                        config.renderCell = (params) => (
                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
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
            className={classnames('adminusers', className)}
            {...rest}
        >
            {alertMessage && severity && (
                <AlertMessage
                    message={alertMessage}
                    severity={severity}
                >
                </AlertMessage>
            )}
            <AdminSection
                title="Catégories"
                rows={categories}
                columns={columnBuilder}
                initialState={{
                    columns: {
                        columnVisibilityModel: {

                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'member_number', sort: 'asc' }],
                    },
                }}
                buttonList={[<AddCategoryModal />]}
            />
        </div>
    );
};

AdminCategory.propTypes = {
    className: PropTypes.string,
};
AdminCategory.defaultProps = {
    className: '',
};

export default React.memo(AdminCategory);
