import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './choiceselection.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../../requests';
import { Button , Box} from '@mui/material'
import { settings } from 'eslint-plugin-import/config/react';

const ChoiceSelection = ({
    className,
    categories,
    updateDisplayRef,
     ...rest})=> {
    const [category, setCategory] = React.useState('');
    const [categoryList,setCategoryList] = React.useState();


    useEffect(()=>{getCategories()},[]);

    const getCategories = async () => {
        const response = await api.post('/customer/category/search',{
            "main": true
          });
      if (response.status === 200){
          setCategoryList(response.data);
      } else {
          console.error(response.data);
      }
    }

    const handleChange = async (event) => {
        setCategory(event.target.value);
        const settings = {
            "page": 1,
            "limit":10,
          }
        if(event.target.value) {
            settings.categories = [event.target.value]
        }

        console.log(settings);
      const response = await api.post('/customer/articles/search',settings)
      if (response.status === 200) {
          updateDisplayRef(response.data);
      } else {
          console.error(response.data);
      }
    };


    return (
      <Box sx={{ minWidth: 120}}>
        <Box>
            <Button value={null} onClick={handleChange}>
                Aucun filtre
            </Button>
        </Box>
        <FormControl className="select-form" fullWidth>
          <InputLabel id="demo-simple-select-label">Catégories Principales</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Catégories Principales"
            onChange={handleChange}
          >
                {categoryList &&
                 categoryList.map((category) => {
                return(
                <MenuItem key={category.id} value={category.id} > {category.name}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </Box>
    )
};

Select.propTypes = {
    className: PropTypes.string,
};
Select.defaultProps = {
    className: '',
};
export default React.memo(ChoiceSelection);
