import React from 'react';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import '../StylesAndImages/GenericForm.css';
import axios from 'axios';

const StudentModal = props => {

    const { register, handleSubmit } = useForm();

    const getData = async () => {
        try {
            const response = await fetch("/students");
            const data = await response.json();
            //console.log(data);
            props.setStudents(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    //edit a student
    const onSubmit = (data) => {

        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                data[key] = props.editModalData[key]
            }
        });
        /*
        if (data.firstname === '') {
           data.firstname = editModalData.firstname;
       }
       */

        let id = props.editModalData._id;

        let updateObj = {
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            email: data.email,
            belt: data.belt,
            stripes: data.stripes,
            dateoflastpromotion: data.dateoflastpromotion
        };

        axios.put(`/students/update/${id}`, updateObj)
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

        window.alert(`${updateObj.firstname} ${updateObj.lastname} has been successfully updated!`);

    }

    //delete a student
    const handleDelete = () => {

        let id = props.editModalData._id;

        let deleteObj = {
            _id: id,
            firstname: props.editModalData.firstname,
            lastname: props.editModalData.lastname,
            phonenumber: props.editModalData.phonenumber,
            email: props.editModalData.email,
            belt: props.editModalData.belt,
            stripes: props.editModalData.stripes,
            dateoflastpromotion: props.editModalData.dateoflastpromotion
        };

        axios.delete(`/students/${id}`, deleteObj)
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

        window.alert(`Deletion of ${deleteObj.firstname} ${deleteObj.lastname} complete.`);

    }

    return (
        <div>
            <Modal
                backdrop="static"
                show={props.showEditModal}
                closeeditmodal={props.closeeditmodal}
            >
                <Modal.Header>
                    <Modal.Title>Update/Delete Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <p className='field_text'>First Name:
                            <input
                                type='text'
                                placeholder={props.editModalData.firstname}
                                name='firstname'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p className='field_text'>Last Name:
                        <input
                                type='text'
                                placeholder={props.editModalData.lastname}
                                name='lastname'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p className='field_text'>Phone Number:
                            <input
                                type='text'
                                placeholder={props.editModalData.phonenumber}
                                name='phonenumber'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p><i>ex: (111)111-1111</i></p>

                        <p className='field_text'>Email:
                            <input
                                type='text'
                                placeholder={props.editModalData.email}
                                name='email'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p className='field_text'>Belt:
                            <input
                                type='text'
                                placeholder={props.editModalData.belt}
                                name='belt'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p className='field_text'>Stripes:
                            <input
                                type='text'
                                placeholder={props.editModalData.stripes}
                                name='stripes'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>

                        <p className='field_text'>Date of Last Promotion:
                            <input
                                type='text'
                                placeholder={props.editModalData.dateoflastpromotion}
                                name='dateoflastpromotion'
                                ref={register}
                                className='active_text'
                                style={{ marginLeft: '5px' }}
                            >
                            </input>
                        </p>
                        <p><i>ex: YYYY-MM-DD</i></p>

                        <div>
                            <Button variant="primary" type='submit'>Save Changes</Button>
                            <Button style={{ marginLeft: '5px' }} variant='secondary' onClick={(event) => props.closeeditmodal(event)}>Cancel</Button>
                        </div>
                        
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
