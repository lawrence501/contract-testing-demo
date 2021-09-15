const mhrClient = require('./mhr_client')

mhrClient.fetchHealthRecord("lmacdonald").then(
  response => {
    console.log(response)
  },
  error => {
    console.error(error)
  }
)