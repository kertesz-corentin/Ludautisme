import React, { useState, useEffect,useCallback } from 'react';
import './admindatagrid.scss'
import { Box, ToggleButton, IconButton  } from '@mui/material';
import { DataGrid, GridToolbar, frFR, GridCheckIcon } from '@mui/x-data-grid';

const AdminDatagrid = ({
    rows,
    schema
}) => {
    // Responsive Datagrid height
    const [height, setHeight] = useState(null);
    const parentSize = useCallback((node) => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);

    const [columns,setColumns] = useState(['id']);


    //Configure custem render cell
    const customCellBuilder = {
        toggle : (params) => (
             <ToggleButton
                    value={params.value || 'Undefined'}
                    selected={params.value}
                    onChange={async () => {
                        //const response = await api.put(`${path}/${params.row.id}`, {[prop] : !params.value});
                        //const newData = await getUsers();
                        //setUsers(newData.data);
                    }}
                    aria-label={`testtoggle-${params.row.id}`}
                >
                                <GridCheckIcon />
            </ToggleButton>
        ),
        edit   : (params) => (
            <IconButton
                value={params.value}
                aria-label={`testEdit-${params.row.id}`}
            >
                {/* <UpdateUserModal params={params} /> */}
            </IconButton>
                    ),
    }


    const columnBuilder = (()=>{
        return Object.keys(schema).map((field) => {
            return {
                type : schema[field].type,
                field : field,
                headerName: schema[field].label,
                width : schema[field].width,
                renderCell : customCellBuilder[schema[field].gridDisplay] || ''
            }

        });

    });
    //console.log(height);
    //console.log(columnBuilder());
    return (
       <div className="datagrid__availableSpace" 
            ref={parentSize}
        >
            <Box
                style={{ height: height - 150 || 200, width: '100%' }} 
                className="datagrid__container"
            >
                <DataGrid
                    rows={rows}
                    columns={(schema)? columnBuilder() : columns}
                    GridColDef="center"
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Box>
        </div>
    )
}

export default React.memo(AdminDatagrid);
