const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {console.log("db connected successfully")})
    .catch((err)=>{
        console.log("err in connecting to database");
        console.log(err);
        process.exit(1);

    });
}