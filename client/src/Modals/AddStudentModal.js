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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' name='firstname' ref={register} />
                    <input type='text' name='lastname' ref={register} />
                    <input type='text' name='phonenumber' ref={register} />
                    <input type='text' name='email' ref={register} />
                    <input type='text' name='belt' ref={register} />
                    <input type='text' name='stripes' ref={register} />
                    <input type='text' name='dateoflastpromotion' ref={register} />
                    <button type='submit'>Submit</button>
                    <br></br>
                    <Button variant='secondary' onClick={(event) => props.closeAddModal(event)}>Cancel</Button>
                </form>
            </Modal>
        </div>
    )
}

export default AddStudentModal
