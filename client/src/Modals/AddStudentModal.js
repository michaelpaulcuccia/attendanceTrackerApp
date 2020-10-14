import React from 'react';
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Static/AddStudentModalStyle.css';
import axios from 'axios';

const AddStudentModal = props => {

    const { register, handleSubmit } = useForm();

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/students");
            const data = await response.json();
            //console.log(data);
            props.setStudents(data);
        } catch (err) {
            console.error(err.message);
        }
    }

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
                //refreshes table with new data
                getData()
                //closes modal
                props.setShowAddModal(!props.showAddModal);
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
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='text_field'>First Name:
                    <input type='text' name='firstname' ref={register} className='input_field' />
                        </p>
                        <p className='text_field'>Last Name:
                    <input type='text' name='lastname' ref={register} className='input_field' />
                        </p>
                        <p className='text_field'>Phone Number:
                    <input type='text' name='phonenumber' ref={register} className='input_field' />
                        </p>
                        <p className='text_field'>Email:
                    <input type='text' name='email' ref={register} className='input_field' />
                        </p>
                        <p className='text_field'>Belt:
                    <input type='text' name='belt' ref={register} className='input_field' />
                        </p>
                        <p className='text_field'>Stripes:
                    <input type='text' name='stripes' ref={register} className='input_field' />
                        </p>
                        <p className='text_field'>Date of Last Promotion
                    <input type='text' name='dateoflastpromotion' ref={register} className='input_field' />
                        </p>
                        <div>
                            <Button variant='primary' type='submit'>Submit</Button>
                            <Button variant='secondary' style={{ marginLeft: '5px' }} onClick={(event) => props.closeAddModal(event)}>Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddStudentModal
