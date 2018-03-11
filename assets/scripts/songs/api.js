'use strict'

const config = require('../config')
const store = require('../store')

const getAllSongs = () => {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createSong = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const editSong = function (data) {
  // console.log('tryin edit a song api call')
  return $.ajax({
    url: config.apiOrigin + '/songs/' + data.song.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteSong = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/songs/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getAllSongs,
  createSong,
  editSong,
  deleteSong
}
