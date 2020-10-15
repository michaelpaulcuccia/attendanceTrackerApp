const express = require('express');
const router = express.Router();

//Bring In Classes Model
const Classes = require('../models/Classes');

//GET 
//http://localhost:5000/classes
router.get('/', (req, res) => {
    Classes.find()
        .then(classes => res.json(classes))
});

//POST
//http://localhost:5000/classes
router.post('/', (req, res) => {
    const newClass = new Classes({
        title: req.body.title,
        trainingtype: req.body.trainingtype,
        days: req.body.days,
        starttime: req.body.starttime,
        endtime: req.body.endtime
    });

    newClass.save()
        .then(item => res.json(item))
});

//DELETE
//http://localhost:5000/classes/:id
router.delete('/:id', (req, res) => {
    Classes.findById(req.params.id)
        .then(
            item => item.remove()
                .then(() => res.json({ success: true })))
        .catch(() => res.status(404).json({ success: false }))
});

//UPDATE
//http://localhost:5000/classes/update/:id
router.route('/update/:id').put((req, res, next) => {
    Classes.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    });
});

module.exports = router;