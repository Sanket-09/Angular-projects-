const events = require('events')
const { EventEmitter } = require('stream')

module.exports = class extends events.EventEmitter {
  constructor() {
    super() //calling the logic of the constructor of the eventEmitter class
  }
}
