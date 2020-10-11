import React from 'react';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentModal = props => {

    
    return (
        <div>
            <Modal
                backdrop="static"
                show={props.showModal}
                closeModal={props.closeModal}
            >
                <Modal.Title>Edit Student Title</Modal.Title>
                <Modal.Header>Edit Student Header</Modal.Header>
                <Modal.Body>
                    Edit Student Body
                </Modal.Body>
                <Modal.Footer>
                    Edit Student Footer
                    <Button
                    onClick={(event) => props.closeModal(event)}
                    >Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StudentModal
