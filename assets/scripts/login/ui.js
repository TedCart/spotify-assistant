'use strict'

const store = require('../store')

const SignedOut = require('../templates/signed-out.handlebars')
const SignedIn = require('../templates/signed-in.handlebars')
const SignedInButtons = require('../templates/signed-in-buttons.handlebars')

const getAccessTokenSuccess = function (data) {
  // $('#welcome-div').html('HOORAY!!!!!!\n' + data)
  // console.log('We received an access token:\n', data)
  store.spotify = store.spotify || {}
  store.spotify = data
  return data
}

const getAccessTokenFailure = function () {
  console.error()
}

const keepGettingThatAccessTokenSuccess = function (data) {
  // console.log('Successful Access!')
  // console.log('data is:\n', data)
  store.spotifySuper = data
}

const signUpSuccess = function (data) {
  // console.log(data)
  $('#welcome-div').text('Successfully created account!')
  $('#create-account-message-box').text('Successfully created account!')
  document.getElementById('new-user-email').value = ''
  document.getElementById('new-user-password').value = ''
  document.getElementById('new-user-password-confirm').value = ''
  setTimeout(() => {
    document.getElementById('close-create-account-button').click()
  }, 500)
  setTimeout(() => {
    $('#sign-in-email').focus()
  }, 1300)
}

const signUpFailure = function (error) {
  console.error(error)
  $('#welcome-div').text('FAIL. Check your info.')
  $('#create-account-message-box').text('Account Create FAIL - check password (or account may already exist)')
  document.getElementById('new-user-email').value = ''
  document.getElementById('new-user-password').value = ''
  document.getElementById('new-user-password-confirm').value = ''
  $('#new-user-email').focus()
}

const signInSuccess = function (data) {
  // console.log(data)
  $('#welcome-div').text('Successfully signed in!')
  store.user = data.user
  refreshLoginDiv()
}

const signInFailure = function (error) {
  console.error(error)
  $('#welcome-div').text('FAIL. Check your info.')
  document.getElementById('sign-in-email').value = ''
  document.getElementById('sign-in-password').value = ''
  $('#sign-in-email').focus()
}

const changePasswordSuccess = function (data) {
  // console.log(data)
  $('#welcome-div').text(`You changed your password!`)
  $('#change-password-status-message').text(`You changed your password!`)
  document.getElementById('change-new-password-input').value = ''
  document.getElementById('change-old-password-input').value = ''
  setTimeout(() => {
    document.getElementById('close-change-password').click()
  }, 500)
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#welcome-div').text(`Password change FAIL`)
  $('#change-password-status-message').text(`Fail. Try again.`)
  document.getElementById('change-new-password-input').value = ''
  document.getElementById('change-old-password-input').value = ''
  $('#change-new-password-input').focus()
}

const signOutSuccess = function (data) {
  // console.log(data)
  store.user = ''
  store.songs = ''
  $('#welcome-div').text(`You signed out!`)
  $('#main-left-container').html('')
  localStorage.clear()
  refreshLoginDiv()
}

const signOutFailure = function (err) {
  console.error(err)
  if (err.statusText === 'Unauthorized') {
    signOutSuccess()
  }
  signOutSuccess()
}

const refreshLoginDiv = function () {
  if (store.user) {
    if (store.user.token) {
      const loggedIn = SignedIn()
      $('#login-div').html(loggedIn)
      const makeButtons = SignedInButtons()
      $('#button-div').html(makeButtons)
      return 4
    }
  }
  const loggedOut = SignedOut()
  $('#login-div').html(loggedOut)
  $('#button-div').html('')
  return 4
}

module.exports = {
  getAccessTokenSuccess,
  getAccessTokenFailure,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  refreshLoginDiv,
  keepGettingThatAccessTokenSuccess
}
