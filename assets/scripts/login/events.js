const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api.js')
const ui = require('./ui.js')

const config = require('../config')
const store = require('../store')

const firstVisitButton = require('../templates/spotify-login.handlebars')

function checkForCodeInURL () {
  if (store.user) {
    if (store.user.token) {
      const xURL = window.location.href
      if (xURL.includes('?code')) {
        // console.log('We got a live code URL!')
        // console.log('Here it is:\n', xURL)
      }
      // This block from: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
      let urlParams
      (window.onpopstate = function () {
        let match
        const pl = /\+/g // Regex for replacing addition symbol with a space
        const search = /([^&=]+)=?([^&]*)/g
        const decode = function (s) {
          return decodeURIComponent(s.replace(pl, ' '))
        }
        const query = window.location.search.substring(1)
        urlParams = {}
        while (match = search.exec(query)) {
          urlParams[decode(match[1])] = decode(match[2])
        }
      })()

      if (urlParams.error) {
        console.log('User denied access!')
        console.log('urlParams.error is:\n', urlParams.error)
        window.location.href = config.frontOrigin
      } else if (urlParams.code) {
        console.log('urlParams.code is:\n', urlParams.code)
        console.log('There shoudn\'t be an error, but for your peace of mind\nurlParams.error is:\n', urlParams.error)
        store.spotify = urlParams
        api.getAccessToken(urlParams)
          .then(ui.getAccessTokenSuccess)
          .then(api.keepGettingThatAccessToken)
          .then(ui.keepGettingThatAccessTokenSuccess)
          .then(ui.getAccessTokenFailure)
      } else {
        let buttonURL = 'https://accounts.spotify.com/authorize/'
        buttonURL = buttonURL + '?client_id=' + config.client_id
        buttonURL = buttonURL + '&response_type=code'
        buttonURL = buttonURL + '&redirect_uri=' + config.frontOrigin
        buttonURL = buttonURL + '&scope=' + config.scope
        buttonURL = buttonURL + '&state=' + 'xXtestStateXx'
        buttonURL = encodeURI(buttonURL)
        // console.log('config.frontOrigin is:', config.frontOrigin)
        // console.log('config.apiOrigin is:', config.apiOrigin)
        const newButton = firstVisitButton({spec: buttonURL})
        $('#login-div').append(newButton)
      }
    }
  }
  // console.log('As an object:\n', urlParams)
}

const onBeforeUnload = function () {
  // if ((store.game) && (store.timerCheck !== '')) {
  if (store.user) {
    if (store.user.token) {
      localStorage.setItem('savedUser', JSON.stringify(store.user))
      store.spotify = store.spotify || {}
      if (store.spotify.code) {
        localStorage.setItem('savedSpotify', JSON.stringify(store.spotify))
      }
      store.spotifySuper = store.spotifySuper || {}
      if (store.spotifySuper) {
        localStorage.setItem('savedSpotifySuper', JSON.stringify(store.spotifySuper))
      }
      // localStorage.setItem('savedGame', JSON.stringify(store.game))
      // localStorage.setItem('CPUplayer', (store.CPUplayer))
      return
    }
  }
  localStorage.removeItem('playerWords')
}

const checkForLogin = function () {
  const objectToVerify = localStorage.getItem('savedUser')
  if (objectToVerify) {
    const verifyAgain = JSON.parse(objectToVerify)
    if (verifyAgain) {
      store.user = verifyAgain
      store.spotify = JSON.parse(localStorage.getItem('savedSpotify'))
      store.spotifySuper = JSON.parse(localStorage.getItem('savedSpotifySuper'))
      console.log('store.spotifySuper is:\n', store.spotifySuper)
    }
  }
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  // console.log(data)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  // console.log(data)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  // console.log(data)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  // console.log(store.user)
  event.preventDefault()
  console.log('atempting sign out')
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// On document ready
function addHandlers () {
  // $('#getWordsButton').on('click', player.printWordsToPage)
  // $('#player-word-form').on('submit', player.inputWord)
  // $('#quit-early').on('click', player.QuitEarly)
  // $('#oldGames').on('click', onGetAllGames)
  // $('body').on('click', '.remove-button', onRemoveGame)
  // $('body').on('click', '.review-button', rebuildGame)
  ui.refreshLoginDiv()
  $('#login-div').on('submit', '#sign-up-form', onSignUp)
  $('#login-div').on('submit', '#sign-in-form', onSignIn)
  $('#login-div').on('submit', '#change-password', onChangePassword)
  $('#login-div').on('click', '#sign-out', onSignOut)
  $(window).on('beforeunload', onBeforeUnload)
}

module.exports = {
  addHandlers,
  checkForCodeInURL,
  checkForLogin
}
