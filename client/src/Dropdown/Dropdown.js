import React, { useState, useEffect } from 'react';
import '../Static/DropdownStyle.css';

const Dropdown = () => {

    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const getData = async () => {
        try {
            const response1 = await fetch("http://localhost:5000/students");
            const data1 = await response1.json();
            //console.log(data);
            setStudents(data1);
            const response2 = await fetch("http://localhost:5000/classes");
            const data2 = await response2.json();
            //console.log(data);
            setClasses(data2);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(students)
    console.log(classes)

    return (

        <div>
            <select className='drop_down'>
                <option disabled selected value>-- select your name -- </option>
                {students.map((student, index) => <option key={student.lastname + [index]} name={student.lastname} value={student.lastname}>{student.lastname}</option>)}
            </select>
        </div>

    );
};

export default Dropdown
