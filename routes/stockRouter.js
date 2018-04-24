'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('../config');

const jwt = require('jsonwebtoken');
const jwtAuth = passport.authenticate('jwt', {session: false});

const { User } = require ('../models/user');

router.use(jwtAuth);
router.use(bodyParser.json());

// GET user portfolio
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json(user.stocks)
    })
});


// Create new user
router.post('/:userId', (req, res) => {
  const stock = {
    symbol: req.body.symbol,
    companyName: req.body.companyName,
    primaryExchange: req.body.primaryExchange,
    sector: req.body.sector,
    open: req.body.open,
    latestPrice: req.body.latestPrice
  }

  User.findById(req.params.userId)
    .then(user => {
      user.stocks.push(stock)
      
      user.save(err => {
        if(err) {
          res.send(err);
        }
        res.json(user);
      })
    })
});

// Delete user
router.delete('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      user.stocks.id(req.body.stockId).remove()

      user.save(err => {
        if(err) {
          res.send(err);
        }
        res.json(user.stocks)
      })
    })
});

module.exports = {router};
