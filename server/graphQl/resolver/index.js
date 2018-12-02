var query = require('./query');
var mutation = require('./mutation');

var root = { ...query, ...mutation };

module.exports = root;