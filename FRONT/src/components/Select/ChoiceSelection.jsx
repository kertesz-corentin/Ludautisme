import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './choiceselection.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../../requests';
import { Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 150,
        },
    },
};

const ChoiceSelection = ({
    className,
    page,
    limit,
    tags,
    setTags,
    updateDisplayRef,
    disponibility,
    setDisponibility,
    categories,
    setCategories,
    ...rest }) => {
    const [category, setCategory] = React.useState('');
    const [categoryList, setCategoryList] = React.useState([]);
    const [subcategories, setSubcategories] = React.useState([]);
    const [subcategoryList, setSubcategoryList] = React.useState([]);
    const [dispo, setDispo] = React.useState('');
    const dispoList = [
        {
            id: 1,
            name: "disponible",
            value: true
        },
        {
            id: 2,
            name: "indisponible",
            value: false
        },
    ]
    useEffect(() => { getCategories() }, []);
    useEffect(() => { getSubCategories() }, []);
    const theme = useTheme();

    function getStyles(tag, subcategories, theme) {
        return {
            fontWeight:
                subcategories.indexOf(tag) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const getCategories = async () => {
        const response = await api.post('/customer/category/search', {
            "main": true
        });
        if (response.status === 200) {
            setCategoryList(response.data);
        } else {
            console.error(response.data);
        }
    }
    const getSubCategories = async () => {
        const response = await api.post('/customer/category/search', {
            "main": false
        });
        if (response.status === 200) {
            setSubcategoryList(response.data);
        } else {
            console.error(response.data);
        }
    }
    const reset = async () => {
        setCategories([]);
        setTags([]);
        setDisponibility([]);
        setSubcategories([]);
        setCategory('');
        setDispo('');

        const settings = {
            page: page,
            limit: limit,
            tags: [],
            available: [],
            categories: [],
        };
        console.log(settings)
        const response = await api.post('/customer/articles/search', settings);
        if (response.status === 200) {
            updateDisplayRef(response.data.data, response.data.total.nb_total);

        } else {
            console.error(response.data);
        }

    }
    const handleChange = async (event) => {
        setCategory(event.target.value);
        const settings = {
            page: page,
            limit: limit,
            tags: tags,
            available: disponibility,
        };
        if (event.target.value) {
            settings.categories = [event.target.value];
            setCategories([event.target.value]);
        }
        console.log(settings);
        const response = await api.post('/customer/articles/search', settings)
        if (response.status === 200) {
            updateDisplayRef(response.data.data, response.data.total.nb_total);

        } else {
            console.error(response.data);
        }
    };
    const subcategoriesHandleChange = async (event) => {
        const {
            target: { value },
        } = event;
        setSubcategories(
            typeof value === 'string' ? value.split(',') : value,
        );
        const settings = {
            page: page,
            limit: limit,
            categories: categories,
            available: disponibility
        };
        if (event.target.value[0]) {
            const settingArray = [];
            event.target.value.map(id => settingArray.push(id));
            settings.tags = settingArray;
            setTags(settingArray);
        }
        console.log(settings);
        const response = await api.post('/customer/articles/search', settings);
        if (response.status === 200) {
            updateDisplayRef(response.data.data, response.data.total.nb_total);
        } else {
            console.error(response.data);
        }
    }
    const disponibilityHandleChange = async (event) => {
        setDispo(event.target.value);
        const settings = {
            page: page,
            limit: limit,
            tags: tags,
            categories: categories,
        };
        if (event.target.value != null) {

            settings.available = [event.target.value];
            setDisponibility([event.target.value]);
        }
        console.log(settings);
        const response = await api.post('/customer/articles/search', settings);
        if (response.status === 200) {
            updateDisplayRef(response.data.data, response.data.total.nb_total);

        } else {
            console.error(response.data);
        }
    }
    return (
        <Box sx={{ minWidth: 120, marginTop: "15px" }}>
            <Box>
                <Button variant="contained" value={null} onClick={reset}>
                    Aucun filtre
                </Button>
            </Box>
            <FormControl className="select-form" fullWidth>
                <InputLabel id="demo-simple-select-label">Catégories Principales</InputLabel>
                <Select
                    className="select-field"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Catégories Principales"
                    onChange={handleChange}
                >
                    {categoryList &&
                        categoryList.map((category) => {
                            return (
                                <MenuItem key={category.id} value={category.id} > {category.name}</MenuItem>)
                        })}
                </Select>
            </FormControl>
            <FormControl className="select-form" fullWidth>
                <InputLabel id="categories-principales">Tags</InputLabel>
                <Select
                    className="select-field"
                    labelId="categories-princiapales"
                    id="demo-multiple-name"
                    multiple
                    value={subcategories}
                    onChange={subcategoriesHandleChange}
                    input={<OutlinedInput label="Tags" />}
                    MenuProps={MenuProps}
                >
                    {subcategoryList && subcategoryList.map((category) => (
                        <MenuItem
                            key={category.id}
                            value={category.id}
                            style={getStyles(category.name, subcategories, theme)}
                        >
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="select-form" fullWidth>
                <InputLabel id="disponibility">Disponibilité</InputLabel>
                <Select
                    className="select-field"
                    labelId="disponibility"
                    id="demo-simple-select"
                    value={dispo}
                    label="Disponibilité"
                    onChange={disponibilityHandleChange}
                >
                    {dispoList &&
                        dispoList.map((dispo) => {
                            return (
                                <MenuItem key={dispo.id} value={dispo.value} > {dispo.name}</MenuItem>)
                        })}
                </Select>
            </FormControl>
        </Box>
    )
};

export default React.memo(ChoiceSelection);
