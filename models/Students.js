const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        unique: true,
        match: [/^\(?[2-9]\d{2}[-)]?\d{3}-?\d{4}$/, "Please enter a ten-digit phone number"]

    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    belt: {
        type: String,
        default: "white"
    },
    stripes: {
        type: Number,
        default: 0
    },
    dateoflastpromotion: {
        type: Date,
    },
    classes: {
        attended: [
            {
                type: Schema.Types.ObjectId,
                ref: "Classes"
            }
        ],
        gi: {
            type: Number,
            default: 0
        },
        nogi: {
            type: Number,
            default: 0
        },
        kickboxing: {
            type: Number,
            default: 0
        },
        openmat: {
            type: Number,
            default: 0
        }
    }
});

const Students = mongoose.model('Student', StudentSchema);

module.exports = Students;

