import React, { useState, useEffect } from 'react';
import '../Static/DropdownStyle.css';
import moment from 'moment';

const StudentCheckIn = () => {

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

    
    const selectHandler = (e) => {

        //Build a CheckIn Data Object - ID, Hour, Day       
        //const checkIn = {};
        //checkIn.now = moment().format('MMMM Do YYYY, h:mm:ss a');
        //checkIn.time = moment().format('h:mm a');
        //checkIn.day = moment().format('dddd');
        //checkIn.ID = id;
        
        const id = e.target.value
        

        //See if a class is happening
        for (let i = 0; i < classes.length; i++){
            if(moment().isBetween(moment(classes[i].starttime, "h:mm a").subtract(15, 'm'), moment(classes[i].starttime, "h:mm a").add(20, 'm'))){
                console.log('it is working!')
            }
        }
        
       
    }

   
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
