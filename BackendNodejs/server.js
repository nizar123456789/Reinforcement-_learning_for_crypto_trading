const express = require('express');

const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./routes/userRoute');
const app = express();
app.use(express.json());
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//routes
app.use('/api/users', User);


//connecting to the database 

const dbURI = "mongodb+srv://TradingBoot:boot@mernstack.utxuidk.mongodb.net/?retryWrites=true&w=majority"

mongoose.set("strictQuery", false);
mongoose.connect(dbURI)
    .then(() => {
        console.log('connected to database')
            // listen to port
        app.listen(5000, () => {
            console.log('listening for requests on port 5000')
        })
    })
    .catch((err) => {
        console.log(err)
    })