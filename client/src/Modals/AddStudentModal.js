import React from 'react';
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Static/GenericForm.css';
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
                closeaddModal={props.closeaddmodal}
            >
                <Modal.Header>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='field_text'>First Name:
                    <input type='text'
                                name='firstname'
                                ref={register}
                                className='active_text_space' 
                                />
                        </p>
                        <p className='field_text'>Last Name:
                    <input type='text'
                                name='lastname'
                                ref={register}
                                className='active_text_space' 
                                />
                        </p>
                        <p className='field_text'>Phone Number:
                    <input type='text'
                                name='phonenumber'
                                ref={register}
                                className='active_text_space' 
                                />
                        </p>
                        <p className='field_text'>Email:
                    <input type='text'
                                name='email'
                                ref={register}
                                className='active_text_space' 
                                />
                        </p>
                        <p className='field_text'>Belt:
                    <input type='text'
                                name='belt'
                                ref={register}
                                className='active_text_space' 
                                />
                        </p>
                        <p className='field_text'>Stripes:
                    <input type='text'
                                name='stripes'
                                ref={register}
                                className='active_text_space' 
                                />
                        </p>
                        <p className='field_text'>Date of Last Promotion
                    <input type='text'
                                name='dateoflastpromotion'
                                ref={register}
                                className='active_text_space' 
                                />
                        </p>
                        <div>
                            <Button variant='primary' type='submit'>Submit</Button>
                            <Button variant='secondary' className='spacer' onClick={(event) => props.closeaddmodal(event)}>Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddStudentModal
