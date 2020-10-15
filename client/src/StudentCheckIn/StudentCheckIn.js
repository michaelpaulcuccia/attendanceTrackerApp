import React, { useState, useEffect } from 'react';
import '../StylesAndImages/StudentCheckInStyle.css';
import moment from 'moment';
import axios from 'axios';

const StudentCheckIn = () => {

    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const getData = async () => {
        try {

            //students
            const response1 = await fetch("http://localhost:5000/students");
            const data1 = await response1.json();
            //console.log(data);
            setStudents(data1);

            //classes
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


    //New Object
    let updatedStudent;
    const updateFunction = (sobj, cobj) => {

        //start with adding an empty classes object
        updatedStudent = { classes: {} };

        //Get Class Type
        let classType = cobj.trainingtype;

        //Filter Out Current Class
        let classes = ['gi', 'nogi', 'openmat', 'kickboxing', 'attended'];
        let filteredClasses = classes.filter(type => type !== classType);

        for (let i = 0; i < filteredClasses.length; i++) {
            //Add Unused Classes to New Object
            updatedStudent.classes[filteredClasses[i]] = sobj.classes[filteredClasses[i]];
        };

        //Update Curernt Class in New Object and add 1 Current Class Total
        updatedStudent.classes[classType] = sobj.classes[classType] + 1;

        //Get Attendance Totals
        let totalAttendance = sobj.classes.attended;
        //Update New Object's Attendance Totals by 1
        updatedStudent.classes.attended = totalAttendance + 1;

        //Update Remaining Key-Values
        updatedStudent.firstname = sobj.firstname;
        updatedStudent.lastname = sobj.lastname;
        updatedStudent.email = sobj.email;
        updatedStudent.phonenumber = sobj.phonenumber;
        updatedStudent.dateoflastpromotion = sobj.dateoflastpromotion;
        updatedStudent.belt = sobj.belt;
        updatedStudent.stripes = sobj.stripes;
        updatedStudent._id = sobj._id

        return updatedStudent
    };

    const putRequest = (obj) => {

        let id = obj._id

        axios.put(`http://localhost:5000/students/update/${id}`, obj)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        

    };

    const selectHandler = (e) => {

        const id = e.target.value

        //Get Student sing ID
        let studentObj;
        for (let i = 0; i < students.length; i++) {
            if (id === students[i]._id) {
                studentObj = students[i]
                break;
            };
        };

        const confirmationCheck = window.confirm(`Do you wish to check-in as ${studentObj.firstname} ${studentObj.lastname}?`);

        if (confirmationCheck === true) {
            //See if a class is happening && Get Class using time-check
            let classObj;
            for (let i = 0; i < classes.length; i++) {
                if (moment().isBetween(moment(classes[i].starttime, "h:mm a").subtract(15, 'm'), moment(classes[i].starttime, "h:mm a").add(20, 'm'))) {
                    console.log('There is a class and you will be checked in.')
                    //console.log(classes[i]);
                    classObj = classes[i];
                    break;
                };
            };
            
            //pass objects to update function - creates updatedStudent
            updateFunction(studentObj, classObj)

            //pass updatedStudent to put request
            putRequest(updatedStudent);

        };

    };


    return (
        <div>
            <select
                className='drop_down'
                onChange={selectHandler}
            >
                <option disabled selected value>-- select your name -- </option>
                {students.map(student => {
                    return (
                        <option key={student._id} value={student._id}>{student.firstname} {student.lastname}</option>
                    )
                })
                }
            </select>
        </div>
    );
};

export default StudentCheckIn
