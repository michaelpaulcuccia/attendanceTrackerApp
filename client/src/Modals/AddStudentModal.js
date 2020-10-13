import React from 'react';
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AddStudentModal = props => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {

        let newStudent = {
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            email: data.email,
            belt: data.belt,
            stripes: data.stripes,
            dateoflastpromotion: data.dateoflastpromotion,
        };

        axios.post('http://localhost:5000/students', newStudent)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        window.alert(`${newStudent.firstname} ${newStudent.lastname} has been successfully added!`);
    };

    return (
        <div>
            <Modal
            backdrop="static"
            show={props.showAddModal}
            closeEditModal={props.closeAddModal}
            >
            <Modal.Header>
                    <Modal.Title>Update/Delete Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>First Name: 
                    <input type='text' name='firstname' ref={register} style={{ marginLeft: '5px' }}/>
                    </p>
                    <p>Last Name: 
                    <input type='text' name='lastname' ref={register} style={{ marginLeft: '5px' }} />
                    </p>
                    <p>Phone Number: 
                    <input type='text' name='phonenumber' ref={register} style={{ marginLeft: '5px' }} />
                    </p>
                    <p>Email:
                    <input type='text' name='email' ref={register} style={{ marginLeft: '5px' }} />
                    </p>
                    <p>Belt:
                    <input type='text' name='belt' ref={register} style={{ marginLeft: '5px' }} />
                    </p>
                    <p>Stripes:
                    <input type='text' name='stripes' ref={register} style={{ marginLeft: '5px' }} />
                    </p>
                    <p>Date of Last Promotion
                    <input type='text' name='dateoflastpromotion' ref={register} style={{ marginLeft: '5px' }} />
                    </p>
                    <Button variant='primary' type='submit'>Submit</Button>
                    <br></br>
                    <Button variant='secondary' onClick={(event) => props.closeAddModal(event)}>Cancel</Button>
                </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddStudentModal
