
const chai = require('chai')
const path = require('path')
const chaiAsPromised = require('chai-as-promised')
const Pact = require('@pact-foundation/pact').Pact
const { term } = require('@pact-foundation/pact').Matchers
const expect = chai.expect
const API_PORT = process.env.API_PORT || 9123
const { fetchHealthRecord } = require('./mhr_client')
chai.use(chaiAsPromised)

// Set up provider stub and consumer test config
const provider = new Pact({
  consumer: 'recommendations-service',
  provider: 'mhr-service',
  port: API_PORT,
  dir: path.resolve(process.cwd(), 'pacts'),
})

describe('Pact with MHR Service', () => {
  // Start stub
  before(() => {
    return provider.setup()
  })

  // Tear down stub
  after(() => {
    return provider.finalize()
  })

  describe('when get client records is called', () => {
    // Add expectations to stub (this becomes the contract definition)
    before(() => {
      return provider.addInteraction({
        uponReceiving: 'get client records',
        withRequest: {
          method: 'GET',
          path: '/records/lmacdonald',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {
            sex: term({ generate: "MALE", matcher: "^MALE|FEMALE$" }),
          },
        },
      })
    })

    // Run request through consumer code, through to stub
    it('can process the JSON payload from the provider', done => {
      const response = fetchHealthRecord("lmacdonald")

      expect(response).to.eventually.have.property('sex')
        .notify(done)
    })

    // Generate contract
    it('should validate the interactions and create a contract', () => {
      return provider.verify()
    })
  })
})