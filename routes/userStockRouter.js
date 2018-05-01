'use strict';
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');

// const jwt = require('jsonwebtoken');
// const jwtAuth = passport.authenticate('jwt', {session: false});

const { User } = require ('../models/user');

// router.use(jwtAuth);
router.use(bodyParser.json());

router.get('/', (req,res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
})
// GET user portfolio
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json(user.stocks)
    })
});


// Create user's new stock
router.post('/:userId', (req, res, next) => {
  console.log(req.body.symbol);
  console.log(req.body.companyName);
  const newStock = {
    symbol: req.body.symbol,
    companyName: req.body.companyName,
    primaryExchange: req.body.primaryExchange,
    sector: req.body.sector,
    open: req.body.open,
    latestPrice: req.body.latestPrice
  }
  console.log(req.params.userId);

  User.findById(req.params.userId)
    .then(user => {
      user.stocks.push(newStock)

      user.save(err => {
        if(err) {
          res.send(err)
        }
        res.json(user)
      })
    })
});

// Delete user's stock
router.delete('/:userId/:id', (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;
  // console.log(req.params);
  // console.log(id);
  // console.log(userId);
  // console.log(req.body);

  User.findById(userId) 
    .then(user => {
      user.stocks.id(id).remove()
      user.save((err, user) => {
        if(err) {
          res.send(err);
        } 
        res.json(user)
      });
    })
    
  // User.update(
  //   {'_id': req.user.id}, 
  //   { $pull: { "stocks" : { _id: req.params.id } } }
  // )
  // .then(function(result) {
  //   console.log(result);
  //   res.json({})
  // })
  // .catch(err => {
  //   next(err);
  // })
});

module.exports = {router};
