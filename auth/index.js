'use strict';
const {router} = require('./router');
const {locatlStrategy, jwtStrategy} = require('./strategies');

module.exports = {router, localStrategy, jwtStrategy};

