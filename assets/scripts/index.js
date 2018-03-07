'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

const login = require('./login/events.js')
const songs = require('./songs/events.js')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

$(() => {
  // login.checkForCodeInURL()
  // setAPIOrigin(location, config)
  login.addHandlers()
  songs.addHandlers()
})

// use require without a reference to ensure a file is bundled
// require('./example')
