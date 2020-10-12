import React from 'react';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import '../Static/StudentModalStyle.css';
import axios from 'axios';

const StudentModal = props => {

    const { register, handleSubmit } = useForm();

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/students");
            const data = await response.json();
            console.log(data);
            props.setStudents(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    //edit a student
    const onSubmit = (data) => {

        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                data[key] = props.modalData[key]
            }
        });
        /*
        if (data.firstname === '') {
           data.firstname = modalData.firstname;
       }
       */

        let id = props.modalData._id;

        let updateObj = {
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            email: data.email,
            belt: data.belt,
            stripes: data.stripes,
            dateoflastpromotion: data.dateoflastpromotion
        };

        axios.put(`http://localhost:5000/students/update/${id}`, updateObj)
            .then(response => {
                console.log(response)
                //refreshes table with new data
                getData()
                //closes modal
                props.setShowModal(!props.showModal);
            })
            .catch(error => {
                console.log(error)
            })

        window.alert(`${updateObj.firstname} ${updateObj.lastname} has been successfully updated!`);

    }

    //delete a student
    const handleDelete = () => {
        
        let id = props.modalData._id;
        
        let deleteObj = {
            _id: id,
            firstname: props.modalData.firstname,
            lastname: props.modalData.lastname,
            phonenumber: props.modalData.phonenumber,
            email: props.modalData.email,
            belt: props.modalData.belt,
            stripes: props.modalData.stripes,
            dateoflastpromotion: props.modalData.dateoflastpromotion
        };

        axios.delete(`http://localhost:5000/students/${id}`, deleteObj)
            .then(response => {
                console.log(response)
                //refreshes table with new data
                getData()
                //closes modal
                props.setShowModal(!props.showModal);
            })
            .catch(error => {
                console.log(error)
            })

        window.alert(`Deletion of ${deleteObj.firstname} ${deleteObj.lastname} complete.`);

    }

    return (
        <div>
            <Modal
                backdrop="static"
                show={props.showModal}
                closeModal={props.closeModal}
            >
                <Modal.Header>
                    <Modal.Title>Update/Delete Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='field_text'>First Name
                            <input
                                type='text'
                                placeholder={props.modalData.firstname}
                                name='firstname'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p className='field_text'>Last Name
                        <input
                                type='text'
                                placeholder={props.modalData.lastname}
                                name='lastname'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p className='field_text'>Phone Number
                            <input
                                type='text'
                                placeholder={props.modalData.phonenumber}
                                name='phonenumber'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p className='field_text'>Email
                            <input
                                type='text'
                                placeholder={props.modalData.email}
                                name='email'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p className='field_text'>Belt
                            <input
                                type='text'
                                placeholder={props.modalData.belt}
                                name='belt'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p className='field_text'>Stripes
                            <input
                                type='text'
                                placeholder={props.modalData.stripes}
                                name='stripes'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p className='field_text'>Date of Last Promotion
                            <input
                                type='text'
                                placeholder={props.modalData.dateoflastpromotion}
                                name='dateoflastpromotion'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <br></br>
                        <Button variant="primary" type='submit'>Save Changes</Button>
                        <Button style={{ marginLeft: '5px' }} variant='secondary' onClick={(event) => props.closeModal(event)}>Cancel</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDelete}>Delete Student</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StudentModal
