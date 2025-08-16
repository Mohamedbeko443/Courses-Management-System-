//!CRUD OPERATIONS WITH EXPRESS JS 

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const httpStatusText = require("./utils/httpStatusText");
const app = express();
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;
mongoose.connect(url).then(()=>console.log("mongodb connected successfully!"))


app.use(cors());

// A built-in middleware to parse body content 
app.use(express.json());



const coursesRouter = require('./routes/courses.route');

app.use('/api/courses', coursesRouter)



//! global middleware for not found routes
//! use [splat] keyword in express v5 
app.all('/*splat', (req ,res)=>{
    return res.status(404).json({status: httpStatusText.ERROR  , message: 'this recourse is NOT available!' });
})

//! global error handler
app.use((err, res) => {
    res.status( err.statusCode || 500).json({status :  err.statusText || httpStatusText.ERROR , error: err});
})

app.listen(port , ()=> {
    console.log(`listening on port ${port}`);
})


//! CORS  => cross origin resource sharing 