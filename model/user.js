const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
   
    first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String
      },
      email:{
        type: String,
        required: true
      },
      password:{
        type: String,
        required: true
      },
    //   name: { type: String, default: 'hahaha' },
    //   age: { type: Number, min: 18, index: true },
    //   bio: { type: String, match: /[a-z]/ },
    //   date: { type: Date, default: Date.now },
    //   buff: Buffer,
      createdAt:{ type: Date, default: Date.now },
      updateddAt:{ type: Date, default: Date.now }
  }
);

module.exports = model('User', userSchema);