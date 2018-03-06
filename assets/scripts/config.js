'use strict'

const config = {
  apiOrigins: {
    development: 'http://localhost:4741',
    production: 'https://spotify-assistant-itunes.herokuapp.com/'
  },
  frontOrigins: {
    development: 'http://localhost:7165',
    production: 'https://tedcart.github.io/spotify-assistant'
  },
  client_id: '0f14640b0cee47149e3b2804d6c97b32',
  scope: 'playlist-read-private playlist-modify-public playlist-modify-private user-follow-modify user-follow-read user-library-read user-library-modify user-read-email user-read-currently-playing user-read-recently-played'
}

module.exports = config
