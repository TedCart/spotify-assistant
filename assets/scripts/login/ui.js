'use strict'

const store = require('../store')

const SignedOut = require('../templates/signed-out.handlebars')
const SignedIn = require('../templates/signed-in.handlebars')
const SignedInButtons = require('../templates/signed-in-buttons.handlebars')

const getAccessTokenSuccess = function (data) {
  $('#welcome-div').html('HOORAY!!!!!!\n' + data)
  console.log(data)
}

const getAccessTokenFailure = function () {
  console.error()
}

const signUpSuccess = function (data) {
  // console.log(data)
  $('#welcome-div').text('Successfully created account!')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#welcome-div').text('FAIL. Check your info.')
}

const signInSuccess = function (data) {
  console.log(data)
  $('#welcome-div').text('Successfully signed in!')
  store.user = data.user
  refreshLoginDiv()
}

const signInFailure = function (error) {
  console.error(error)
  $('#welcome-div').text('FAIL. Check your info.')
}

const changePasswordSuccess = function (data) {
  // console.log(data)
  $('#welcome-div').text(`You changed your password!`)
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#welcome-div').text(`Password change FAIL FAIL`)
}

const signOutSuccess = function (data) {
  // console.log(data)
  store.user = ''
  store.songs = ''
  $('#welcome-div').text(`You signed out!`)
  refreshLoginDiv()
}

const signOutFailure = function (error) {
  console.error(error)
}

const refreshLoginDiv = function () {
  if (store.user) {
    const loggedIn = SignedIn()
    $('#login-div').html(loggedIn)
    const makeButtons = SignedInButtons()
    $('#button-div').html(makeButtons)
  } else {
    const loggedOut = SignedOut()
    $('#login-div').html(loggedOut)
    $('#button-div').html('')
  }
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
  refreshLoginDiv
}
