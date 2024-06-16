import React from 'react';
import PropTypes from 'prop-types';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Button } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../../../../requests';

const ListOfReferences = ({
    className,
    references,
    display,
    currentItems,
    gridSize,
    isLoading,
    checkbox,
    ...rest
}) => {

    const [extendArray, setExtendArray] = React.useState([]);
    const userToken = JSON.parse(localStorage.getItem('user'));

    const handleExtend = async () => {
        let body = {articleNumbers: extendArray};
        const extend = await api.post(`/customer/booking/extend/${userToken.id}`, body);

        if (extend.status === 200) {
            toast.success("Demande de prolongation envoyée");
        } else {
            toast.error(extend.data.message);
        }
    }
    return (
        references.length ?
            <React.Fragment>
                <CssBaseline />
                <Grid
                    className={`gridList ${className}`}
                    container
                    direction="row"
                    justifyContent="center"
                    alignContent="flex-start"
                    alignItems="center"
                >
                    {references.map((reference, index) =>
                    (
                        <Reference
                            currentItems={currentItems}
                            display={display}
                            gridSize={gridSize}
                            reference={reference}
                            checkbox={checkbox}
                            setExtendArray={setExtendArray}
                            extendArray={extendArray}
                        />
                    )
                    )}
                </Grid>
                {(checkbox) &&
                    <Button
                        onClick={handleExtend}
                        variant="contained"
                        style={{ marginTop: "10px" }}
                    >
                        Prolonger la sélection
                    </Button>
                }
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
