'use strict';

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    symbol: { type: String },
    companyName: { type: String },
    primaryExchange: { type: String },
    sector: { type: String },
    open: { type: Number },
    latestPrice: { type: Number },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// stockSchema.set('toObject', {
//     transform: function(doc, ret) {
//       ret.id = ret._id;
//       delete ret._id;
//       delete ret.__v;
//     } 
//   });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock, stockSchema };
