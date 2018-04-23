'use strict';

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    company: {type: String },
    currentStockPrice: { type: Number }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock, stockSchema };
