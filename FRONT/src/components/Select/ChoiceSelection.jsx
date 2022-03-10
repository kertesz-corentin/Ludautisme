import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './choiceselection.scss';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ChoiceSelection = ({className,categories, ...rest}) => {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
      setCategory(event.target.value);
    };
    console.log(category)
    console.log(categories)

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Jeux</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Jeux"
            onChange={handleChange}
          >
             {categories.map((category) => {
                return(
                <MenuItem key={category.id} value={category.id}> {category.name}</MenuItem>)
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
