import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../StylesAndImages/GenericForm.css';
import axios from 'axios';

const EditClassModal = props => {

    const { register, handleSubmit } = useForm();

    //console.log(props.editModalData)

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

        //console.log(data)

        if (data.title === '') {
            data.title = props.editModalData.title;
        }
        if (data.starttime === '') {
            data.starttime = props.editModalData.starttime;
        }
        if (data.endtime === '') {
            data.endtime = props.editModalData.endtime;
        }
        if (data.days === '') {
            data.days = props.editModalData.days;
        }
        //use `|| true` in the event that a class is not chosen in dropdown
        if (data.trainingtype === '' || true) {
            data.trainingtype = props.editModalData.trainingtype;
        }

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

    //delete a class
    const handleDelete = () => {

        let id = props.editModalData._id;

        let deleteObj = {
            _id: id,
            title: props.editModalData.title,
            starttime: props.editModalData.starttime,
            endtime: props.editModalData.endtime,
            days: props.editModalData.days,
            trainingtype: props.editModalData.trainingtype,
        };

        axios.delete(`http://localhost:5000/classes/${id}`, deleteObj)
            .then(response => {
                console.log(response)
                //refreshes table with new data
                getData()
                //closes modal
                props.setShowEditModal(!props.showEditModal);
            })
            .catch(error => {
                console.log(error)
            })

        window.alert(`Deletion of ${deleteObj.title} complete.`);

    };

    return (
        <div>
            <Modal
                backdrop="static"
                show={props.showEditModal}
                closeeditmodal={props.closeeditmodal}
            >
                <Modal.Header>
                    <Modal.Title>Update/Delete Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <p className='field_text'>Class Title:
                            <input
                                type='text'
                                placeholder={props.editModalData.title}
                                name='title'
                                ref={register}
                                className='active_text_space'
                            >
                            </input>
                        </p>

                        <p className='field_text'>Start Time:
                            <input
                                type='text'
                                placeholder={props.editModalData.starttime}
                                name='starttime'
                                ref={register}
                                className='active_text_space'
                            >
                            </input>
                        </p>
                        <p><i>ex: 12:00am</i></p>

                        <p className='field_text'>End Time:
                            <input
                                type='text'
                                placeholder={props.editModalData.endtime}
                                name='endtime'
                                ref={register}
                                className='active_text_space'
                            >
                            </input>
                        </p>
                        <p><i>ex: 12:00am</i></p>

                        <p className='field_text'>Days:
                            <input
                                type='text'
                                placeholder={props.editModalData.days}
                                name='days'
                                ref={register}
                                className='active_text_space'
                            >
                            </input>
                        </p>
                        <p><i>ex: Sunday, ex: Sunday, Monday,...</i></p>

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
                            <Button type='submit' variant="primary">Save Changes</Button>
                            <Button className='spacer' variant='secondary' onClick={(event) => props.closeeditmodal(event)}>Cancel</Button>
                        </div>
                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDelete}>Delete Class</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default EditClassModal