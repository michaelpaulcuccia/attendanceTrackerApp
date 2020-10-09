const express = require('express');
const { update } = require('../models/Students');
const router = express.Router();

//Bring In Students Model
const Students = require('../models/Students');

//GET 
//http://localhost:5000/students
router.get('/', (req, res) => {
    Students.find()
        .then(students => res.json(students))
});

//POST
//http://localhost:5000/students
router.post('/', (req, res) => {
    const newStudent = new Students({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        belt: req.body.belt,
        stripes: req.body.stripes,
        dateoflastpromotion: req.body.dateoflastpromotion,
    });

    newStudent.save()
        .then(item => res.json(item))
});

//DELETE
//http://localhost:5000/students/:id
router.delete('/:id', (req, res) => {
    Students.findById(req.params.id)
        .then(
            item => item.remove()
                .then(() => res.json({ success: true })))
        .catch(() => res.status(404).json({ success: false }))
});

//UPDATE
//http://localhost:5000/students/update/:id
router.post('/update/:id', (req, res) => {
    let update;
    Students.findByIdAndUpdate(req.params.id, update)
        .then(update => {
            update.firstname = req.body.firstname;
            update.lastname = req.body.lastname;
            update.phonenumber = req.body.phonenumber;
            update.email = req.body.email;
            update.belt = req.body.belt;
            update.stripes = req.body.stripes;
            update.dateoflastpromotion = req.body.dateoflastpromotion;

            update.save()
                .then(() => res.json({ studentUpdated: true }))
                .catch(() => res.status(400).json({ studentUpdated: false }))
        })

        .catch(err => res.status(400).json('Error: ' + err));
});

/*
{
    "firstname": "updatedFN",
    "lastname": "updatedLN",
    "phonenumber": "(999)999-9999",
    "email": "updated1@mail.com",
    "belt": "white",
    "stripes": 0,
    "dateoflastpromotion": "10-09-2020"
}
*/

module.exports = router;