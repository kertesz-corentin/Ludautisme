import React from 'react';
import PropTypes from 'prop-types';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid} from '@mui/material';

const ListOfReferences = ({
    className,
    references,
    display,
    currentItems,
    gridSize,
    isLoading,
     ...rest
    }) => {
    return (
        references.length ?
        <React.Fragment>
          <CssBaseline />
          <Grid
            className ={`gridList ${className}`}
            container
            direction="row"
            justifyContent="center"
            alignContent="flex-start"
            alignItems="center"
        >
                {references.map((reference,index)=>
                (
                    <Reference
                        currentItems={currentItems}
                        display={display}
                        gridSize={gridSize}
                        reference={reference}
                    />

                )

            )}
            </Grid>
        </React.Fragment>
        :
        <div className='gridList-empty'>
          <p>Nous n'avons aucun article à vous présenter</p>
        </div>
      );
};

ListOfReferences.propTypes = {
    className: PropTypes.string,
};
ListOfReferences.defaultProps = {
    className: '',
};
export default React.memo(ListOfReferences);
