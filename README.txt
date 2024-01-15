server/
    config/
        database.js
    Controlers/
        Auth.js
    middleweres/
        auth.js
    models/
        user.js
        modules.js
    routes/
        user.js
    index.js

server/models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","Student"]
    }
})


module.exports = mongoose.model("user",userSchema);




server/routes/user.js
const express = require("express");
const router =  express.Router();


const {login, signup}= require('../Controllers/Auth');
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

router.post('/login', login);
router.post('/signup', signup);


server/index.js
const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000; // Use 3000 as default if PORT is not defined

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json()); // Call express.json() middleware

app.use(cookieParser());

require("./config/database").connect();

// Routes import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



project setup:
npm i express nodemon mongoose dotenv bcrypt jsonwebtoken