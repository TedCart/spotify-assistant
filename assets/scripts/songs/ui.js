const store = require('../store')

const songsTable = require('../templates/songs-table.handlebars')
const songRow = require('../templates/song-row.handlebars')
const newSongAddRow = require('../templates/new-song-add-row.handlebars')

const getAllSongsSuccess = function (data) {
  console.log('data from getSongs:\n', data)
  $('#welcome-div').text(`You got all the songs! \n See console log for details...`)
  store.songs = data.songs
  const songsForDiv = songsTable({ songs: store.songs })
  $('#main-left-container').html(songsForDiv)
}

const getAllSongsFailure = function () { console.error() }

const createSongSuccess = function (data) {
  console.log('data from new song:\n', data)
  $('#welcome-div').text(`You made a song! \n See console log for details...`)
  const newRow = newSongAddRow({ song: data.song })
  $('#main-left-container').append(newRow)
  if (store.songs) { store.songs.push(data.song) }
}

const createSongFailure = function () { console.error() }

const editSongSuccess = function (data) {
  console.log('data from updated song:\n', data)
  $('#welcome-div').text(`You updated a song! \n See console log for details...`)
  const replacementRow = songRow({ song: data.song })
  $('#row-' + data.song.id).html(replacementRow)
  if (store.songs) {
    const oldSong = store.songs.find(e => e === store.old.id)
    const indexOfOldSong = store.songs.indexOf(oldSong)
    store.songs.splice(indexOfOldSong, 1)
    store.songs.push(data.song)
  }
  store.old = {}
}

const editSongFailure = function () { console.error() }

const deleteSongSuccess = function () {
  console.log('Song successfully deleted!')
  $('#welcome-div').text(`You DELETED a song! \n See console log for details...`)
  const rowToDelete = $('#row-' + store.oldDelete.id)
  rowToDelete.parentNode.removeChild(rowToDelete)
  store.oldDelete = {}
}

const deleteSongFailure = function () { console.error() }

module.exports = {
  getAllSongsSuccess,
  getAllSongsFailure,
  createSongSuccess,
  createSongFailure,
  editSongSuccess,
  editSongFailure,
  deleteSongSuccess,
  deleteSongFailure
}
