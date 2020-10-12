import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const AddStudentModal = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        
        let newStudent = {
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            email: data.email,
            belt: data.belt,
            stripes: data.stripes,
            dateoflastpromotion: data.dateoflastpromotion,
        };

        axios.post('http://localhost:5000/students', newStudent)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        
        window.alert(`${newStudent.firstname} ${newStudent.lastname} has been successfully added!`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' name='firstname' ref={register} />
                <input type='text' name='lastname' ref={register} />
                <input type='text' name='phonenumber' ref={register} />
                <input type='text' name='email' ref={register} />
                <input type='text' name='belt' ref={register} />
                <input type='text' name='stripes' ref={register} />
                <input type='text' name='dateoflastpromotion' ref={register} />
                <button type='submit'>Submit</button>
            </form>
            
        </div>
    )
}

export default AddStudentModal
