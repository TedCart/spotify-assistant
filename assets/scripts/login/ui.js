const store = require('../store')

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
  // console.log(data)
  $('#welcome-div').text('Successfully signed in!')
  store.user = data.user
}

const signInFailure = function (error) {
  console.error(error)
  $('#welcome-div').text('FAIL. Check your info.')
}

const changePasswordSuccess = function (data) {
  // console.log(data)
}

const changePasswordFailure = function (error) {
  console.error(error)
}

const signOutSuccess = function (data) {
  // console.log(data)
  store.user = ''
  $('#welcome-div').text(`You signed out!`)
}

const signOutFailure = function (error) {
  console.error(error)
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
  signOutFailure
}
