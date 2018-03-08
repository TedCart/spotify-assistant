const store = require('../store')

const songsTable = require('../templates/songs-table.handlebars')
const songRow = require('../templates/song-row.handlebars')

const getAllSongsSuccess = function (data) {
  console.log('data from getSongs:\n', data)
  $('#welcome-div').text(`You got all the songs! \n See console log for details...`)
  store.songs = data.songs
  const songsForDiv = songsTable({ songs: store.songs })
  $('#main-left-container').html(songsForDiv)
}

const getAllSongsFailure = function () {
  console.error()
}

const createSongSuccess = function (data) {
  console.log('data from new song:\n', data)
  $('#welcome-div').text(`You made a song! \n See console log for details...`)
}

const createSongFailure = function () {
  console.error()
}

const editSongSuccess = function (data) {
  console.log('data from updated song:\n', data)
  $('#welcome-div').text(`You updated a song! \n See console log for details...`)
  const replacementRow = songRow({ song: data.song })
  $('#row-' + data.song.id).html(replacementRow)
  store.old = {}
}

const editSongFailure = function () {
  console.error()
}

module.exports = {
  getAllSongsSuccess,
  getAllSongsFailure,
  createSongSuccess,
  createSongFailure,
  editSongSuccess,
  editSongFailure
}
