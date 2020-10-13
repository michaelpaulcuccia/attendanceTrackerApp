import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const EditClassModal = props => {


    const { register, handleSubmit } = useForm();
    console.log(props.editModalData)

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/classes");
            const data = await response.json();
            //console.log(data);
            props.setClasses(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const onSubmit = data => {
        console.log(data)

        Object.keys(data).forEach(key => {
            if (data[key] === '' || true) {
                data[key] = props.editModalData[key]
            }
        });
        /*
        if (data.title === '') {
           data.title = editModalData.title;
       }
       //use `|| true` in the event that a class is not chosen in dropdown
       */
        

        let id = props.editModalData._id;

        let updateObj = {
            title: data.title,
            starttime: data.starttime,
            endtime: data.endtime,
            days: data.days,
            trainingtype: data.trainingtype
        };

        axios.put(`http://localhost:5000/classes/update/${id}`, updateObj)
            .then(response => {
                console.log(response)
                //refreshes table with new data
                getData()
                //closes modal
                props.setShowEditModal(!props.showEditModal);
            })
            .catch(error => {
                console.log(error)
            });

        window.alert(`${updateObj.title} has been successfully updated!`);

    };

    return (
        <div>
            <Modal
                backdrop="static"
                show={props.showEditModal}
                closeEditModal={props.closeEditModal}
            >
                <Modal.Header>
                    <Modal.Title>Update/Delete Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <p>Class Title:
                            <input
                                type='text'
                                placeholder={props.editModalData.title}
                                name='title'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p>Start Time:
                            <input
                                type='text'
                                placeholder={props.editModalData.starttime}
                                name='starttime'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p>End Time:
                            <input
                                type='text'
                                placeholder={props.editModalData.endtime}
                                name='endtime'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p>Days:
                            <input
                                type='text'
                                placeholder={props.editModalData.days}
                                name='days'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p>Training Type:
                        <select
                                type='text'
                                name="trainingtype"
                                ref={register}
                                className='input'
                                style={{ marginLeft: '5px' }}
                            >
                                <option disabled selected value>-- select an option -- </option>
                                <option value="gi">Gi</option>
                                <option value="nogi">NoGi</option>
                                <option value="openmat">Open Mat</option>
                                <option value="kickboxing">Kickboxing</option>
                            </select>
                        </p>

                        <br></br>
                        <Button type='submit' variant="primary">Save Changes</Button>
                        <Button variant="seconday" onClick={(event) => props.closeEditModal(event)}>Cancel</Button>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default EditClassModal
