import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import EditStudentModal from '../Modals/EditStudentModal';
import AddStudentModal from '../Modals/AddStudentModal';
import  '../Static/ButtonStyle.css'


const StudentTable = ({ showStudent, setShowStudent }) => {

    const [students, setStudents] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/students");
            const data = await response.json();
            //console.log(data);
            setStudents(data);
        } catch (err) {
            console.error(err.message);
        }
    }; 

    useEffect(() => {
        getData();
    }, []);

    //open and close table
    const handleShowHideTable = () => {
        setShowStudent(!showStudent);
    };

    //opens and closes add modal
    const handleShowHideAdd = () => {
        setShowAddModal(!showAddModal);
    }

     //closes edit modal
     const closeEditModal = useCallback(
        (event) => {
            event.preventDefault()
            setShowEditModal(showEditModal)
        },[]);

    //closes add modal
    const closeAddModal = useCallback(
        (event) => {
            event.preventDefault()
            setShowAddModal(showAddModal)
        },[]);

    const columnDefs = [
        {
            headerName: "Edit/Delete",

            cellRenderer: (params) => {

                //HTML
                var eDiv = document.createElement('div');
                eDiv.innerHTML = '<span><button class="btn_table">Edit/Delete</button></span>';
                var eButton = eDiv.querySelectorAll('.btn_table')[0];

                eButton.addEventListener('click', function () {

                    setShowEditModal(!showEditModal)
                    setEditModalData(params.data)
                    //console.log(params.data);

                });

                return eDiv;
            }
        },
        { headerName: "First Name", field: "firstname", sortable: true, filter: true },
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true },
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
    ];

    return (
        <div>

            <div className="ag-theme-alpine-dark" style={{ height: 400, width: '80%', margin: 'auto', marginTop: '20px' }}>
                <Button variant='dark'
                    style={{marginBottom: '3px', border: 'none'}}
                    onClick={handleShowHideTable}>
                    Close
                </Button>
                <Button 
                    style={{marginLeft: '5px', marginBottom: '3px', backgroundColor: '#7F8183', border: 'none'}}
                    onClick={handleShowHideAdd}>
                    Add Student
                </Button>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={students}
                >
                </AgGridReact>
            </div>

            <div>
                <EditStudentModal
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    closeEditModal={closeEditModal}
                    editModalData={editModalData}
                    students={students}
                    setStudents={setStudents}
                />
            </div>

            <div>
                {showAddModal &&
                    <AddStudentModal
                    closeAddModal={closeAddModal}
                    setStudents={setStudents}
                    showAddModal={showAddModal}
                    setShowAddModal={setShowAddModal}
                    />
                } 
            </div>

        </div>

    )
}

export default StudentTable
