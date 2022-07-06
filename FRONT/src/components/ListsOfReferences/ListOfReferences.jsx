import React from 'react';
import PropTypes from 'prop-types';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
                        key = {`${reference.id}-${index}`}
                        id={reference.id}
                        result= {reference.id}
                        name={reference.name}
                        description={reference.description}
                        maincategory={reference.maincategory}
                        picture={reference.picture}
                        tag={reference.tag}
                        valorisation={reference.valorisation}
                        nb_available={reference.nb_available}
                        nb_total={reference.nb_total}
                        gridSize={gridSize}
                        isLoading={isLoading}
                        idArticle={reference.art_id}
                        favorite={reference.favorite}
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
