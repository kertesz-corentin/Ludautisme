import React from 'react';
import PropTypes from 'prop-types';
// import { DataGrid, GridToolBar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import './adminsection.scss';

const AdminSection = ({ title }) => {
    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 100,
    //     maxColumns: 6,
    // })
    return (
        <section className='section'>
            <div class="section-element">
                <h1 className="section-element-title">Tableau de bord - {title}</h1>
            </div>
            <div class="section-element">
                <button className="section-element-add">Ajouter {title}</button>
            </div>
            <div class="section-element">
                <div className="section-element-grid">
                    {/* <DataGrid
                        {...data}
                        components={{
                            Toolbar: GridToolBar,
                        }}
                    /> */}
                    datagrid
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
