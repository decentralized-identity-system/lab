# Decentralized Identity System

The Decentralized Identity System DID (`did:dis`) standard, proposed by [District Labs](http://districtlabs.com/) and [Disco](https://disco.xyz/), is an [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/) (EVM) based decentralized identifier (DID) standard that embodies [progressive commitment threshold engineering principles](https://github.com/decentralized-identity-system/did-dis).

**DISCLAIMER:** **Smart Wallet (Account Abstraction) features are missing from the current implementation .** For simplicities sake an existing EIP-4337 implementation will be forked and the DID standard will be integrated when the time is right.

The `did:dis` standard gives users a low-friction (and low-cost) method for bootstrapping a blockchain based Smart Wallet, with built-in support for the W3C [decentralized identifier](https://www.w3.org/TR/did-core/) and [verifiable credential](https://www.w3.org/TR/vc-data-model/) standards.

The standard relies on a combination of [counterfactual statements](https://en.wikipedia.org/wiki/Counterfactual_conditional), [offchain Identity Hubs](https://identity.foundation/decentralized-web-node/spec/0.0.1-predraft/) and [onchain Public Key Infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure).

Giving people all over the world the ability to bootstrap a new decentralized identifier using only **2 private key signatures**, while maintaining the ability to progressively strengthen the security and robustness of the underlying Smart Wallet, as they reach new Web3 commitment thresholds.

The standard uses the following concepts, standards and technologies:

- [Decentralized Identifier](https://www.w3.org/TR/did-core/#:~:text=Decentralized%20identifiers%20(DIDs)%20are%20a,the%20controller%20of%20the%20DID.) (DID) Documents
- Counterfactual Statements
- [Identity Hubs](https://identity.foundation/decentralized-web-node/spec/0.0.1-predraft) - Offchain Data Storage for Cryptographically Signed Messages
- Cross-Chain Interoperability Protocol ([EIP-3668](https://eips.ethereum.org/EIPS/eip-3668))
- Account Abstraction ([EIP-4337](https://eips.ethereum.org/EIPS/eip-4337) i.e. Smart Wallets)
- Onchain Public Key Infrastructure
- Authorization, Object Capabilities and Intents

The Decentralized Identity System DID (`did:dis`) standard, proposed by [District Labs](http://districtlabs.com/) and [Disco](https://disco.xyz/), is a blockchain based DID (decentralized identifier) standard that embodies [progressive commitment threshold engineering principles](https://hackmd.io/@kames/progressive-commitment-thresholds).
