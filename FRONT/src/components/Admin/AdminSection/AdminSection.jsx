import React from 'react';
import PropTypes from 'prop-types';

// import material ui components
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid';
import { Fab } from '@mui/material';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

import './adminsection.scss';

const AdminSection = ({ title, link, rows, columns, initialState, children, buttonList, apiRef }) => {

    return (
        <section className='section'>
            <div className='section-head'>
                <div className="section-element">
                    <h1 className="section-element-title">Tableau de bord - {title}</h1>
                </div>
                {link && (
                    <div className='section-head-ask'>
                        <Fab color="primary" aria-label="help" href={link} target='_blank' size='small'>
                            <QuestionMarkOutlinedIcon color='' />
                        </Fab>
                    </div>
                )}
            </div>
            <div className='section-element-modal'>
                {children &&
                    <div style={{ width: "100%" }}>{children}</div>
                }
                {buttonList &&
                    buttonList.map(button => { return <div>{button}</div> })}
            </div>
            <div className="section-element">
                <div className="section-element-grid" style={{ width: '100%' }}>
                    <DataGrid
                        apiRef={apiRef}
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        disableSelectionOnClick
                        GridColDef='center'
                        disableColumnSelector
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                        slotProps={{
                            toolbar: {
                              showQuickFilter: true,
                            },
                          }}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={initialState}
                    />
                </div>
            </div>
        </section>
    );
};

AdminSection.propTypes = {
    className: PropTypes.string,
};
AdminSection.defaultProps = {
    className: '',
};
export default React.memo(AdminSection);
