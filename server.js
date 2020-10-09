const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-Parser");
require('dotenv').config();

const app = express();

//Body Parser Middleware
app.use(bodyParser.json());

//mongoDB Atlas connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to MongoDB Atlas is working!");
});

//access to routes
const classesRoute = require('./routes/ClassesRoutes');

//use routes 
app.use('/classes', classesRoute); //- the route ending with /classes will use the classesRoute variable

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));