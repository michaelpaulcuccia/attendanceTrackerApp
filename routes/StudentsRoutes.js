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
router.route('/update/:id').put((req, res, next) => {
    Students.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    });
});

module.exports = router;