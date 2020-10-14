import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import EditClassModal from '../Modals/EditClassModal';
import AddClassModal from '../Modals/AddClassModal';
import '../Static/ButtonStyle.css'

const ClassTable = ({ showClass, setShowClass }) => {

    const [classes, setClasses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:5000/classes");
                const data = await response.json();
                //console.log(data);
                setClasses(data);
            } catch (err) {
                console.error(err.message);
            }
        }
        getData();
    }, []);

    //open and close table
    const handleShowHide = () => {
        setShowClass(!showClass);
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
        }, []);

    //closes add modal
    const closeAddModal = useCallback(
        (event) => {
            event.preventDefault()
            setShowAddModal(showAddModal)
        }, []);

    const columnDefs = [
        {
            headerName: "Edit/Delete",

            cellRenderer: (params) => {

                //HTML
                var eDiv = document.createElement('div');
                eDiv.innerHTML = '<span><button class="btn_table">Edit/Delete</button></span>';
                var eButton = eDiv.querySelectorAll('.btn_table')[0];

                eButton.addEventListener('click', function () {

                    setShowEditModal(!showEditModal);
                    setEditModalData(params.data);

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
            <Button variant='dark'
                onClick={handleShowHide}>
                Close
            </Button>
            <Button variant='outline-dark'
                style={{ marginLeft: '5px', marginBottom: '3px' }}
                onClick={handleShowHideAdd}>
                Add Class
                </Button>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={classes}>
            </AgGridReact>

            <div>
                <EditClassModal
                    closeEditModal={closeEditModal}
                    editModalData={editModalData}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    setClasses={setClasses}
                />
            </div>

            <div>
                {showAddModal &&
                    <AddClassModal
                        closeAddModal={closeAddModal}
                        setClasses={setClasses}
                        showAddModal={showAddModal}
                        setShowAddModal={setShowAddModal}
                    />
                }
            </div>


        </div>
    )
}

export default ClassTable
