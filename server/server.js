const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')





require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true, useCreateIndex:true});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully ");
});

const exercisesRouter = require('./routers/exercises');
const usersRouter = require('./routers/users');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.use(cors());
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`server in running on port ${PORT}`);
});