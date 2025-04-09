import React from 'react';
import PropTypes from 'prop-types';
import './listofreferences.scss';
import Reference from '../Reference/Reference';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Button } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../../../../requests';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ListOfReferences = ({
    className,
    references,
    display,
    currentItems,
    gridSize,
    isLoading,
    checkbox,
    refresh,
    exportMode,
    ...rest
}) => {

    const [extendArray, setExtendArray] = React.useState([]);
    const userToken = JSON.parse(localStorage.getItem('user'));

    const handleExtend = async () => {
        if (extendArray.length > 0) {
            let body = { articleNumbers: extendArray };
            const extend = await api.post(`/customer/booking/extend/${userToken.id}`, body);

            if (extend.status === 200) {
                toast.success("Demande de prolongation envoyée");
            } else {
                toast.error(extend.data.message);
            }
            refresh();
        } else {
            toast.error("sélectionnez les articles que vous souhaitez prolonger");
        }
    }

    const exportList = () => {
        const doc = new jsPDF();

        doc.text("Liste de Favoris", 10, 10);

        const columns = [
            "Nom",
            "Catégorie",
            "Catégorie Secondaire",
            "Numéros"
        ];
        const rows = [];

        for (let i = 0; i < references.length; i++) {
            let tags = [];
            for (const tag of references[i].tag) {
                if (tag.name != references[i].maincategory) tags.push(tag.name)
            }
            var temp = [
                references[i].name,
                references[i].maincategory,
                tags,
                references[i].numberList
            ];
            rows.push(temp);
        }
        doc.autoTable(columns, rows, {
            startY: 20,
            theme: "grid",
            styles: {
                font: "times",
                halign: "center",
                cellPadding: 3.5,
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                textColor: [0, 0, 0]
            },
            headStyles: {
                textColor: [0, 0, 0],
                fontStyle: "normal",
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                fillColor: [166, 204, 247]
            },
            alternateRowStyles: {
                fillColor: [212, 212, 212],
                textColor: [0, 0, 0],
                lineWidth: 0.5,
                lineColor: [0, 0, 0]
            },
            rowStyles: {
                lineWidth: 0.5,
                lineColor: [0, 0, 0]
            },
            tableLineColor: [0, 0, 0]
        });

        doc.save("favoris.pdf");
    }
    return (
        references.length ?
            <React.Fragment>
                {(exportMode) &&
                    <Button
                        variant="contained"
                        style={{ width: "20em" }}
                        onClick={exportList}>
                        Exporter en PDF
                    </Button>
                }
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
