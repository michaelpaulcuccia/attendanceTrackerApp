import React, { useState, useEffect } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

function StudentTable() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:5000/students");
                const data = await response.json();
                console.log(data)
                setStudents(data)
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
        { headerName: "Last Name", field: "firstname", sortable: true, filter: true },
        { headerName: "Last Name", field: "firstname", sortable: true, filter: true },
        { headerName: "Phone Number", field: "phonenumber", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Belt", field: "belt", sortable: true, filter: true },
        { headerName: "stripes", field: "stripes", sortable: true, filter: true },
        { headerName: "Date of Last Promotion", field: "dateoflastpromotion", sortable: true, filter: true },
        { headerName: "Classes Atteneded", field: "classes.attended", sortable: true, filter: true },
        { headerName: "Gi", field: "classes.gi", sortable: true, filter: true },
        { headerName: "NoGi", field: "classes.nogi", sortable: true, filter: true },
        { headerName: "OpenMat", field: "classes.openmat", sortable: true, filter: true },
        { headerName: "Kickboxing", field: "classes.kickboxing", sortable: true, filter: true }
    ]

    return (
        <div className="ag-theme-alpine-dark" style={{ height: 400, width: '80%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={students}>
            </AgGridReact>
        </div>
    )
}

export default StudentTable
