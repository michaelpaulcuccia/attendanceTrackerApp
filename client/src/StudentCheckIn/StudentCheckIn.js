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
        let classType = cobj.trainingtype
        console.log(classType);


        /*
        //console.log(sobj)
        //console.log(sobj.classes.attended)

        let classesObj = sobj.classes;
        console.log(classesObj)

        const studentsClassesKeys = Object.keys(classesObj);
        //const studentsClassesValues = Object.values(classesObj);

        for (let i = 0; i < studentsClassesKeys.length; i++){
            //console.log(studentsClassesKeys[i]);
            if(classType === studentsClassesKeys[i]){
                console.log('match');
                break;
            }
        };
        */        

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
