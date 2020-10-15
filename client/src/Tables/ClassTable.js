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

    useEffect(() => {
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
    const closeeditmodal = useCallback(
        (event) => {
            event.preventDefault()
            setShowEditModal(showEditModal)
        }, []);

    //closes add modal
    const closeaddmodal = useCallback(
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
        {
            headerName: "Days",

            cellRenderer: (params) => {
                //Get Data Array, Convert to String
                let daysArray = params.data.days;
                let convertedDaysArray = daysArray.toString();

                //HTML
                var eDiv = document.createElement('div');
                eDiv.innerHTML = `<span><p>${convertedDaysArray}</p></span>`;

                return eDiv;
            }

        },
        { headerName: "Type", field: "trainingtype", sortable: true, filter: true },
    ];

    return (
        <div className="ag-theme-alpine-dark" style={{ height: 300, width: '65%', margin: 'auto', marginTop: '35px' }}>
            <Button variant='dark'
                style={{ marginBottom: '3px', border: 'none' }}
                onClick={handleShowHide}>
                Close
            </Button>
            <Button
                style={{ marginLeft: '5px', marginBottom: '3px', backgroundColor: '#7F8183', border: 'none' }}
                onClick={handleShowHideAdd}>
                Add Class
                </Button>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={classes}>
            </AgGridReact>

            <div>
                <EditClassModal
                    closeeditmodal={closeeditmodal}
                    editModalData={editModalData}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    setClasses={setClasses}
                />
            </div>

            <div>
                {showAddModal &&
                    <AddClassModal
                        closeaddmodal={closeaddmodal}
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
