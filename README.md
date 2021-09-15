# contract-testing-demo
Simple demo of JS contract testing. As shown in Monash University presentation on 15/09/2021.

## Getting started

### Installation
In each service's dir, `npm install` (requires node v14.15.0+)

### Running services
`npm start` in each service's dir. MHR Service must be running first for Recommendations Service to run properly.

### Running contract tests
`npm test` in each service's dir. Run for Recommendations Service first to generate the contract, then for MHR to verify the contract.
