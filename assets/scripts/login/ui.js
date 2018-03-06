const store = require('../store')

const getAccessTokenSuccess = function (data) {
  console.log(data)
}

const getAccessTokenFailure = function () {
  console.error()
}

module.exports = {
  getAccessTokenSuccess,
  getAccessTokenFailure
}
