const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    title: {
        type: String,
        required: true
    }, //ex: Sun-Mon-Wed PM Gi Class / Tues-Thurs AM NoGi / Fri-Sat AM Open Mat / Sun PM Open Mat 
    trainingtype: {  
        type: String,
        required: true
    }, // Gi, NoGi, Kickboxing, Open-Mat, Private
    days: [
        { type: String, required: true } // 'Sunday' moment.format('dddd')
    ],
    starttime: {
        type: String, // 5:00 pm - moment.format("h:mm a")
        required: true
    },
    endtime: {
        type: String, // 5:00 pm - moment.format("h:mm a")
        required: true
    },
})

const Classes = mongoose.model('Class', ClassSchema);

module.exports = Classes;