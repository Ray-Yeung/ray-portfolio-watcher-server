'use strict';
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('../config');
const { User } = require('../models/user');

// const jwt = require('jsonwebtoken')
// const jwtAuth = passport.authenticate('jwt', {session: false});

// router.use(jwtAuth);
router.use(bodyParser.json());

router.post('/register', (req, res) => {
  let {username, password} = req.body;
  console.log(req.body);
//   return User.hashPassword(password)
//     .then(digest => {
//       const newUser = {
//         username,
//         password: digest
//       };
//       return User.create(newUser);
//     })
//     .then(result => {
//       return res.status(201).location(`/api/users/${result.id}`).json(result);
//     })
//     .catch(err => {
//       if(err.code === 11000) {
//         return res.status(400).json({
//           code: 400, 
//           reason: 'ValidationError',
//           message: 'The username already exists',
//           location: "username'"
//         });
//       }
//       next(err);
//     });
});

module.exports = {router};
