const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  profilePicture : {
    type : String,
    default : ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin : {
    type : Boolean,
    default : false
  }


},{timestamps: true});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;