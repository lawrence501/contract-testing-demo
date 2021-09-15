const { server } = require('./service.js')
const port = process.env.API_PORT || 9123

server.listen(port, () => {
  console.log(`MHR Service listening on http://localhost:${port}`)
})