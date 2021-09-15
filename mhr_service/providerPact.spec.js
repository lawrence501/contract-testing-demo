const Verifier = require('@pact-foundation/pact').Verifier
const path = require('path')
const certPath = path.resolve(__dirname, "../../ca-bundle.crt");
process.env.SSL_CERT_FILE = certPath;
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const { server } = require('./service.js')

// Spin up MHR Service
server.listen(8081, () => {
  console.log('Provider service listening on http://localhost:8081')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of the Consumer', () => {
    let opts = {
      provider: 'mhr-service',
      providerBaseUrl: 'http://localhost:8081',
      providerVersion: '1.0.0',
      pactUrls: [
        path.resolve(__dirname, '../recommendations_service/pacts/recommendations-service-mhr-service.json')
      ]
    }

    return new Verifier().verifyProvider(opts).then(output => {
      console.log('Pact Verification Complete!')
      console.log(output)
    })
  })
})