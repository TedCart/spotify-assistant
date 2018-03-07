const api = require('./api.js')
const ui = require('./ui.js')

const config = require('../config')
const store = require('../store')

const firstVisitButton = require('../templates/spotify-login.handlebars')

function checkForCodeInURL () {
  const xURL = window.location.href
  if (xURL.includes('?code')) {
    console.log('We got a live code URL!')
    console.log('Here it is:\n', xURL)
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
    api.getAccessToken(urlParams)
      .then(ui.getAccessTokenSuccess)
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
    $('#login-div').html(newButton)
  }
  // console.log('As an object:\n', urlParams)
}

const onBeforeUnload = function () {
  // if ((store.game) && (store.timerCheck !== '')) {
  if (store.code) {
    // localStorage.setItem('savedGame', JSON.stringify(store.game))
    // localStorage.setItem('playerWords', JSON.stringify(store.playerWords))
    // localStorage.setItem('playerWordCoordinates', JSON.stringify(store.playerWordCoordinates))
    // localStorage.setItem('timerEndPoint', (store.timerEndPoint))
    // localStorage.setItem('timerCheck', (store.timerCheck))
    // localStorage.setItem('CPUplayer', (store.CPUplayer))
  } else {
    // localStorage.removeItem('playerWords')
    // localStorage.removeItem('playerWordCoordinates')
    // localStorage.removeItem('timerEndPoint')
    // localStorage.removeItem('timerCheck')
  }
}

// On document ready
function addHandlers () {
  // $('#getWordsButton').on('click', player.printWordsToPage)
  // $('#player-word-form').on('submit', player.inputWord)
  // $('#quit-early').on('click', player.QuitEarly)
  // $('#oldGames').on('click', onGetAllGames)
  // $('body').on('click', '.remove-button', onRemoveGame)
  // $('body').on('click', '.review-button', rebuildGame)
  $(window).on('beforeunload', onBeforeUnload)
}

module.exports = {
  addHandlers,
  checkForCodeInURL
}