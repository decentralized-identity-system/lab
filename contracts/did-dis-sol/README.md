# Public Key Infrastructure & Smart Wallet Smart Contracts

The `did-dis-sol` module contains the public key infrastructure (PKI) and Smart Wallet smart contract reference implementations.


**DISCLAIMER:** **Smart Wallet (Account Abstraction) features are missing from the current implementation .** For simplicities sake an existing EIP-4337 implementation will be forked and the DID standard will be integrated when the time is right.

# Installation

Install the repo and dependencies by running:

`pnpm`

## Deployment

These contracts can be deployed to a network by running:

`pnpm deploy <networkName>`

## Verification

These contracts can be verified on Etherscan, or an Etherscan clone, for example (Polygonscan) by running:

`pnpm etherscan-verify <ethereum network name>`

# Testing

Run the unit tests locally with:

`pnpm test`

## Coverage

Generate the test coverage report with:

`pnpm coverage`
