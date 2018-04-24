'use strict';

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    symbol: { type: String },
    companyName: { type: String },
    primaryExchange: { type: String },
    sector: { type: String },
    open: { type: Number },
    latestPrice: { type: Number }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock, stockSchema };
