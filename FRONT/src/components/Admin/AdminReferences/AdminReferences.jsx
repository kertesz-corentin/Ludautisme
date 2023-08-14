import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import requests
import api from '../../../requests/index';

// import react components
import AdminSection from '../AdminSection/AdminSection';
import AddReferenceModal from '../AddReferenceModal/AddReferenceModal';
import UpdateReferenceModal from '../UpdateReferenceModal/UpdateReferenceModal';
import { referenceSchema } from '../../../Schemas';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';

// import material ui component
import { IconButton, Button } from '@mui/material';

import './adminreferences.scss';
import '../BookingUserChoice/bookinguserchoice.scss';

const AdminReferences = ({ className, ...rest }) => {
    const [references, setReferences] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [articleValue, setArticleValue] = useState('');
    // config path for api route
    const path = '/admin/references';

    const getReferences = async () => {
        try {
            const response = await api.get('/admin/references');
            if (response.status === 200) {
                setReferences(response.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const getMainCategories = async () => {
        try {
            const response = await api.post('/admin/categorie/search', { "main": true });
            const data = await response.data;
            if (response.status === 200) {
                setCategories(data);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const getTags = async () => {
        try {
            const response = await api.post('/admin/categorie/search', { "main": false });
            const data = await response.data;
            if (response.status === 200) {
                setTags(data);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleSearchByArticleNUmber = async (event) => {
        try {
            setArticleValue(event.target.value);
            if (!event.target.value) {
                const response = await api.get('/admin/references');
                setReferences(response.data);
            } else {
                const response = await api.get(`/admin/references/article/${event.target.value}`);
                if (response.status === 200) {
                    setReferences(response.data);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (err) {
            toast.error(err.response.data.message);
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
    const articleInput =
        <TextField
            id='outlined'
            label="n° d'article"
            name='article_number'
            type='number'
            value={articleValue}
            onChange={handleSearchByArticleNUmber}
            className="booking-search-element"
            style={{ width: "150px" }}
        >
        </TextField>

    return (
        <div
            className={classnames('adminreferences', className)}
            {...rest}
        >
            <AdminSection
                title="Références"
                link='https://docs.google.com/document/d/1rkWT0BrwOoEZ24t1yPaiZLNRAB57SHKUIhaQoSqXp-M/edit?usp=sharing'
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
                buttonList={[<AddReferenceModal categories={categories} tags={tags} getReferences={getReferences} />, categoryButton, articleInput]}
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
