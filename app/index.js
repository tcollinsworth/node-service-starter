// eslint-disable-next-line no-global-assign
require = require('esm')(module/* , options */)
// module.exports = require('./lib/kafka-publisher') // es6

const server = require('./server.js')

server.init()
