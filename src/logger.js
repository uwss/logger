const loggers = require("./logger-class");
const ext = require("./logger-class-ext");

const errors = require("./errors");

module.exports = {
  ...loggers,
  ext,

  ...errors
};

