import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './choiceselection.scss';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ChoiceSelection = ({className, ...rest}) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Jeux</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Jeux"
            onChange={handleChange}
          >
            <MenuItem value={1}>Jeux</MenuItem>
            <MenuItem value={2}>Aide à la motricité</MenuItem>
            <MenuItem value={3}>Apprentissage</MenuItem>
            <MenuItem value={4}>Montessori</MenuItem>
            <MenuItem value={5}>Médiathèque</MenuItem>
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
