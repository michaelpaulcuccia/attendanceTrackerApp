import React from 'react'
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditClassModal = props => {
    return (
        <div>
            <Modal
                backdrop="static"
                show={props.showEditModal}
                closeEditModal={props.closeEditModal}
            >
                <Modal.Header>
                    <Modal.Title>Update/Delete Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <p>Class Title:
                            <input>
                            </input>
                        </p>

                        <p>Start Time:
                            <input>
                            </input>
                        </p>

                        <p>End Time:
                            <input>
                            </input>
                        </p>

                        <p>Days
                        <select name="days"
                            //ref={register} 
                            //className='input'
                            >
                                <option placeholder="select an option"></option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                        </p>

                        <p>Training Type
                        <select name="trainingtype"
                            //ref={register} 
                            //className='input'
                            >
                                <option placeholder="select an option"></option>
                                <option value="gi">Gi</option>
                                <option value="nogi">NoGi</option>
                                <option value="openmat">Open Mat</option>
                                <option value="kickboxing">Kickboxing</option>
                            </select>
                        </p>

                        <br></br>
                        <Button variant="primary">Save Changes</Button>
                        <Button variant="seconday" onClick={(event) => props.closeEditModal(event)}>Cancel</Button>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default EditClassModal
