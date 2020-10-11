import React, { useState, useEffect } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const ClassTable = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:5000/classes");
                const data = await response.json();
                console.log(data)
                setClasses(data)
            } catch (err) {
                console.error(err.message)
            }
        }
        getData();
    }, []);

    const columnDefs = [
        {
            headerName: "Edit/Delete",

            cellRenderer: (params) => {

                //HTML
                var eDiv = document.createElement('div');
                eDiv.innerHTML = '<span><button class="btn-edit"></button></span>';
                var eButton = eDiv.querySelectorAll('.btn-edit')[0];

                eButton.addEventListener('click', function () {

                    console.log('click')
                    console.log(params.data)

                });

                return eDiv;
            }
        },
        { headerName: "Class Title", field: "title", sortable: true, filter: true },
        { headerName: "Start", field: "starttime", sortable: true, filter: true },
        { headerName: "End", field: "endtime", sortable: true, filter: true },
        { headerName: "Days", field: "days.length", sortable: true, filter: true },
        { headerName: "Type", field: "trainingtype", sortable: true, filter: true },
    ];

    return (
        <div className="ag-theme-alpine-dark" style={{ height: 400, width: '80%', margin: 'auto', marginTop: '35px' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={classes}>
            </AgGridReact>
        </div>
    )
}

export default ClassTable
