const request = require('superagent')
const API_HOST = process.env.API_HOST || 'http://localhost'
const API_PORT = process.env.API_PORT || 9123
const API_ENDPOINT = `${API_HOST}:${API_PORT}`

const fetchHealthRecord = clientId => {
  return request
    .get(`${API_ENDPOINT}/records/${clientId}`)
    .then(
      res => {
        if (res.body.sex == "MALE" || res.body.sex == "FEMALE") {
          return res.body
        } else {
          throw new Error(`Invalid sex format in response: ${res.body.sex}`)
        }
      },
      err => {
        throw new Error(`Error from response: ${err}`)
      }
    )
}

module.exports = {
  fetchHealthRecord,
}