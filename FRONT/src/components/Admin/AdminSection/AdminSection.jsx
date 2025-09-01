import React from 'react';
import PropTypes from 'prop-types';

// import material ui components
import { DataGrid } from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
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
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxHeight: 600}}>
                    <DataGrid
                        apiRef={apiRef}
                        showToolbar
                        ignoreDiacritics
                        rows={rows}
                        columns={columns}
                        
                        disableSelectionOnClick
                        GridColDef='center'
                        disableColumnSelector
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
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
