import React from 'react';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import '../Static/StudentModalStyle.css';
import axios from 'axios';

const StudentModal = props => {

    const { register, handleSubmit } = useForm();

    //edit a student
    const onSubmit = (data) => {
       
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
            })
            .catch(error => {
                console.log(error)
            })
        
        window.alert(`${updateObj.firstname} ${updateObj.lastname} has been successfully updated!`);
    
        //closes modal
        props.setShowModal(!props.showModal);
    }

    //delete a student
    const handleDelete = () => {
        //console.log(props.modalData._id)
        let deleteObj = {
            _id: props.modalData._id
        };
        axios.delete(`http://localhost:5000/students/${props.modalData._id}`, deleteObj)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        //closes modal
        props.setShowModal(!props.showModal);
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
