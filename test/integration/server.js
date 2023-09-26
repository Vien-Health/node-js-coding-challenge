const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const unless = require('express-unless')
const auth = require('./helpers/jwt.js');
const users = require('./controllers/UserController.js')
const errors = require('./helpers/errorHandler.js')

app.use(cors({origin: "http://localhost:3001"})) // Default = CORS-enabled for all origins Access-Control-Allow-Origin: *!
app.use(express.json()) // middleware for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless
app.use(auth.authenticateToken.unless({
    path: [
        { url: '/users/login', methods: ['POST']},
        { url: '/users/logout', methods: ['GET']},
        { url: '/users/register', methods: ['POST']}
    ]
}))

app.use('/users', users) // middleware for listening to routes
//app.use(errors.errorHandler); // middleware for error responses

// MongoDB connection, success and error event responses
const conn = "mongodb+srv://Kelo-user:DgwqqZbz6ScC8ukH@mymongodb.7476n.mongodb.net/MyMongoDB?retryWrites=true&w=majority";
 mongoose.connect(conn, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => { console.log('MongoDB connection successful!'); },
    err => { console.log ('DB connection failed!');  }
)



app.listen(3002);