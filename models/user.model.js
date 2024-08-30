const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:true,
        trim:true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    role:{
        type:String,
        default:"Visiter",
        enum:["Admin","Student", "Visiter"]
    }
  },
  { timestamps: true }
);

userSchema.index({ username: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
