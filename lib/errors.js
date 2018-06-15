'use strict';

var createError = require('errno').create;

var GeekCashcoreNodeError = createError('GeekCashcoreNodeError');

var RPCError = createError('RPCError', GeekCashcoreNodeError);

module.exports = {
  Error: GeekCashcoreNodeError,
  RPCError: RPCError
};
