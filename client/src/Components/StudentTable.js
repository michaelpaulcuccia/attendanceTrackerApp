import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';

function StudentTable() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:5000/students");
                const data = await response.json();
                console.log(data)
                setStudents(data)
            } catch (err) {
                console.error(err.message)
            }
        }
        getData();
    }, []);

    
    return (
        <div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Belt</th>
                        <th>Stripes</th>
                        <th>Date of Last Promotion</th>
                        <th>Total Classes</th>
                        <th>Gi</th>
                        <th>NoGi</th>
                        <th>Open-Mat</th>
                        <th>KickBoxing</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{students.map((student, index) => (<option key={student.firstname + [index]} name={student.firstname} value={student.firstname}>{student.firstname}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.lastname + [index]} name={student.lastname} value={student.lastname}>{student.lastname}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.phonenumber + [index]} name={student.phonenumber} value={student.phonenumber}>{student.phonenumber}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.email + [index]} name={student.email} value={student.email}>{student.email}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.belt + [index]} name={student.belt} value={student.belt}>{student.belt}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.stripes + [index]} name={student.stripes} value={student.stripes}>{student.stripes}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.dateoflastpromotion + [index]} name={student.dateoflastpromotion} value={student.dateoflastpromotion}>{student.dateoflastpromotion}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.classes.attended + [index]} name={student.classes.attended} value={student.classes.attended}>{student.classes.attended}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.classes.gi + [index]} name={student.classes.gi} value={student.classes.gi}>{student.classes.gi}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.classes.nogi + [index]} name={student.classes.nogi} value={student.classes.nogi}>{student.classes.nogi}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.classes.openmat + [index]} name={student.classes.openmat} value={student.classes.openmat}>{student.classes.openmat}</option>))}</td>
                        <td>{students.map((student, index) => (<option key={student.classes.kickboxing + [index]} name={student.classes.kickboxing} value={student.classes.kickboxing}>{student.classes.kickboxing}</option>))}</td>
                    </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default StudentTable

