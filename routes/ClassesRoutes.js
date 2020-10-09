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

/*
{
	"title": "titleTest1",
    "trainingtype": "trainingtypeTest1",
    "days": ["Monday", "Tuesday"],
    "starttime": "starttimeTest1",
    "endtime": "endtimeTest1"
}
*/

//DELETE
//http://localhost:5000/classes/:id
router.delete('/:id', (req, res) => {
   Classes.findById(req.params.id)
    .then(
        item => item.remove()
        .then(() => res.json({success: true})))
        .catch(() => res.status(404).json({success: false}))
});

module.exports = router;