'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Stock = require('../models/portfolio');

// GET user portfolio
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json(user.stocks)
    })
});

router.post('/:userId', (req, res) => {
  const porfolio = {
    company: req.body.company,
    currentStockPrice: req.body.currentStockPrice
  }
});