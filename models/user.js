'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {stockSchema} = require('./stock');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stocks: [stockSchema]
});

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};  

userSchema.set('toObject', {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    } 
  });

//test
const User = mongoose.model('User', userSchema);

module.exports = {User};
