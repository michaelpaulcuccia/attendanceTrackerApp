import React from 'react';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";

const StudentModal = props => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data.firstname)
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
                        <Button style={{marginLeft: '5px'}} variant='danger' onClick={(event) => props.closeModal(event)}>Cancel</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default StudentModal
