const getFormFields = require(`../../../lib/get-form-fields`)

const config = require('../config')
const store = require('../store')

const api = require('./api.js')
const ui = require('./ui.js')

const songUpdateForm = require('../templates/song-update-row.handlebars')

const onGetAllSongs = function () {
  api.getAllSongs()
    .then(ui.getAllSongsSuccess)
    .catch(ui.getAllSongsFailure)
}

const onCreateSong = function (event) {
  const data = getFormFields(this)
  // console.log(data)
  event.preventDefault()
  api.createSong(data)
    .then(ui.createSongSuccess)
    .catch(ui.createSongFailure)
}

const editSetup = function (event) {
  event.preventDefault()
  // FYI: dataset.songId translates to data-song-id in the DOM
  if (store.old) {
    if (store.old.id) { cancelEdit() }
  }
  const butClick = event.target
  const songId = butClick.dataset.songId
  store.old = {}
  store.old.id = songId
  store.old.Title = $('#title-' + songId).text()
  store.old.Artist = $('#artist-' + songId).text()
  store.old.backup = $('#row-' + songId).html()
  const tempForm = songUpdateForm({song: store.old})
  $('#row-' + songId).html(tempForm)
  $('#input-title-replace-' + songId).focus()
}

const onEditSong = function (event) {
  const data = getFormFields(event.target)
  event.preventDefault()
  console.log('edit song script ran\n', data)
  console.log('Target was this:\n', event.target)
  api.editSong(data)
    .then(ui.editSongSuccess)
    .catch(ui.editSongFailure)
}

const cancelEdit = function () {
  // store.old is a saved version of the row where you clicked edit
  if (store.old.id) {
    $('#row-' + store.old.id).html(store.old.backup)
    store.old = {}
  }
}

// On document ready
function addHandlers () {
  // $('#getWordsButton').on('click', player.printWordsToPage)
  // $('#player-word-form').on('submit', player.inputWord)
  // $('body').on('click', '.remove-button', onRemoveGame)
  $('#button-div').on('click', '#get-songs', onGetAllSongs)
  $('#button-div').on('submit', '#create-song', onCreateSong)

  $('body').on('click', '.edit-button', editSetup)
  $('body').on('submit', '.edit-song-form', onEditSong)

  $('body').on('click', '.cancel-edit-button', cancelEdit)
  // $('body').on('submit', '#update-song-form', onEditSong)
  // $('body').on('click', '.confirm-edit-button', submitEditSong)

  // $('#login-div').on('submit', '#sign-in-form', onSignIn)
  // $('#login-div').on('submit', '#change-password', onChangePassword)
  // $('#login-div').on('click', '#sign-out', onSignOut)
  // $(window).on('beforeunload', onBeforeUnload)
}

module.exports = {
  addHandlers
}
