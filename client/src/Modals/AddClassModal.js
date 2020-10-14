import React from 'react';
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Static/GenericForm.css';
import axios from 'axios';

const AddClassModal = props => {

    const { register, handleSubmit } = useForm();

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

        let newClass = {
            title: data.title,
            starttime: data.starttime,
            endtime: data.endtime,
            days: data.days,
            trainingtype: data.trainingtype
        };

        axios.post('http://localhost:5000/classes', newClass)
            .then(response => {
                console.log(response)
                //refreshes table with new data
                getData()
                //closes modal
                props.setShowAddModal(!props.showAddModal);
            })
            .catch(error => {
                console.log(error)
            })

        window.alert(`${newClass.title} has been successfully added!`);

    }

    return (
        <div>
            <Modal
                backdrop="static"
                show={props.showAddModal}
                closeEditModal={props.closeAddModal}
            >
                <Modal.Header>
                    <Modal.Title>Add Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <p className='field_text'>Title:
                    <input type='text'
                                name='title'
                                ref={register}
                                className='active_text_space'
                            />
                        </p>

                        <p className='field_text'>Start Time:
                    <input type='text'
                                name='starttime'
                                ref={register}
                                className='active_text_space'
                            />
                        </p>

                        <p className='field_text'>End Time:
                    <input type='text'
                                name='endtime'
                                ref={register}
                                className='active_text_space'
                            />
                        </p>

                        <p className='field_text'>Days:
                    <input type='text'
                                name='days'
                                ref={register}
                                className='active_text_space'
                            />
                        </p>

                        <p className='field_text'>Training Type:
                        <select
                                type='text'
                                name="trainingtype"
                                ref={register}
                                className='active_text_space'
                            >
                                <option disabled selected value>-- select an option -- </option>
                                <option value="gi">Gi</option>
                                <option value="nogi">NoGi</option>
                                <option value="openmat">Open Mat</option>
                                <option value="kickboxing">Kickboxing</option>
                            </select>
                        </p>

                        <div>
                            <Button variant='primary' type='submit'>Submit</Button>
                            <Button variant='secondary' className='spacer' onClick={(event) => props.closeAddModal(event)}>Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default AddClassModal
