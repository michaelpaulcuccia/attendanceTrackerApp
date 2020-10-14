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

    const updateFunction = (sobj, cobj) => {

        //Get Class Type
        let classType = cobj.trainingtype
        console.log(classType);
        
        //Attendance Array
        let attendanceArray = [];
        let studentAttendance = {totals: sobj.classes.attended, type: 'attended'};
        let studentGi = {totals: sobj.classes.gi, type: 'gi'};
        let studentNoGi = {totals: sobj.classes.nogi, type: 'nogi'};
        let studentOpenMat= {totals: sobj.classes.openmat, type: 'openmat'};
        let studentKickboxing = {totals: sobj.classes.kickboxing, type: 'kickboxing'};
        attendanceArray.push(studentAttendance, studentGi, studentNoGi, studentOpenMat, studentKickboxing)

        //Get Totals of Class Type
        let totalClassType;
        //Update Total of Class Type by 1
        let newTotalClassType;
                for (let i = 0; i < attendanceArray.length; i++){
            if(classType === attendanceArray[i].type){
                totalClassType = attendanceArray[i].totals;
                newTotalClassType = totalClassType + 1
                break;
            }
        };
        
        //Get Totals of Attendance 
        let totalAttendance = studentAttendance.totals;
        //Update Total Attendance by 1
        let newTotalAttendance = totalAttendance + 1;

        console.log(totalClassType)
        console.log(newTotalClassType)
        console.log(totalAttendance)
        console.log(newTotalAttendance)
     
            

    };

    
    const selectHandler = (e) => {
      
        const id = e.target.value

        //Get Student sing ID
        let studentObj;
        for (let i = 0; i < students.length; i++){
            if(id === students[i]._id){ 
                studentObj = students[i]
                break;
            };
        };
        console.log(studentObj)
        
        //See if a class is happening 
        //Get Class using time-check
        let classObj;
        for (let i = 0; i < classes.length; i++){
            if(moment().isBetween(moment(classes[i].starttime, "h:mm a").subtract(100, 'm'), moment(classes[i].starttime, "h:mm a").add(100, 'm'))){
                console.log('There is a class and you will be checked in.')
                classObj = classes[i]
                break;
                //run function to update student's attendance
            }; 
        };        
        console.log(classObj)

        //pass objects to update function
        updateFunction(studentObj, classObj)
       
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
