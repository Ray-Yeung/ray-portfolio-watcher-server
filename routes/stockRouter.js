'use strict';
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const jwtAuth = passport.authenticate('jwt', {sesson: false});

const {Stock} = require('../models/stock');

router.use(jwtAuth);
router.use(bodyParser.json());

// GET user stocks
router.get('/stocks', (req, res, next) => {
  const userId = req.user.id;
  Stock.find({userId})
    .srot('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// POST/create new stock
router.post('/stocks', (req, res, next) => {
  const stock = {
    symbol: req.body.symbol,
    companyName: req.body.companyName,
    primaryExchange: req.body.primaryExchange,
    sector: req.body.sector,
    open: req.body.open,
    latestPrice: req.body.latestPrice,
    logo: req.body.logo
  }

  const userId = req.user.id;
  const newStock = { stock, userId };
  
  Stock.create(newStock)
    .then(result => {
      res.location(`${re.originalUrl}/{${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

// DELETE a stock
router.delete('/stocks/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  Stock.findOneAndRemove({ _id: id, userId })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = {router};