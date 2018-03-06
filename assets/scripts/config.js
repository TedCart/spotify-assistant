'use strict'

const config = {
  apiOrigins: {
    development: 'http://localhost:4741',
    production: 'https://spotify-assistant-itunes.herokuapp.com/'
  },
  frontOrigins: {
    development: 'http://localhost:7165',
    production: 'https://tedcart.github.io/spotify-assistant'
  }
}

module.exports = config
