let mongoose = require("mongoose");

let loginSchema=  new mongoose.Schema({
   firstname: {
    type: String,
    required: true
  },

  lastname: String,

  gmail: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true, //  allows null for phone users
    match: /^\S+@\S+\.\S+$/
  },



  password: {
    type: String,
    required: true,
    minlength: 8
  }

})


let loginModel = mongoose.model("loginModel",loginSchema);


module.exports = loginModel;


 



