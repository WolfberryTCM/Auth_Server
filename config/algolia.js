const algoliasearch = require('algoliasearch');

const client = algoliasearch('R9VL3D4TTM','7a8951eaeddcb3102545226eee52c5d3');
const doctors = client.initIndex('doctors')

module.exports = doctors