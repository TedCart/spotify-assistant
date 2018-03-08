'use strict'

const config = require('../config')
const store = require('../store')

const getAccessToken = function (urlParams) {
  urlParams.uri = config.frontOrigin
  // urlParams = JSON.stringify(urlParams)
  console.log('urlParams is this for the API call:\n', urlParams)
  return $.ajax({
    url: config.apiOrigin + '/spotify',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: urlParams
  })
}

const keepGettingThatAccessToken = function (xData) {
  return $.ajax({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + store.spotify.clientAuth
    },
    data: {
      grant_type: 'authorization_code',
      code: store.spotify.code,
      redirect_uri: store.spotify.uri
    }
  })
}

const signUp = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = (data) => {
  // const json = JSON.stringify(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getAccessToken,
  signUp,
  signIn,
  changePassword,
  signOut,
  keepGettingThatAccessToken
}
