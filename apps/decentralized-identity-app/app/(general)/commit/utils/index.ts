import { type Address, toHex } from 'viem'
import { utils } from 'ethers'
import moment from 'moment'

/**
 * Generates a cryptographically secure random salt of uint256.
 * @returns A random uint256 salt value as a BigInt.
 */
export function generateSalt() {
  // Create an array of 32 bytes (256 bits)
  const bytes = new Uint8Array(32)

  // Populate the bytes array with cryptographically secure random numbers
  crypto.getRandomValues(bytes)

  // Convert the bytes array to a hex string
  let hex =
    '0x' +
    Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')

  // Convert the hex string to a BigInt
  return BigInt(hex)
}

/**
 * Constructs a DID document from the given parameters.
 */
export function constructDidDocument({
  pkiAddress,
  chainId,
  walletAddress,
  eoaAddress,
}: {
  pkiAddress: Address
  chainId: number | undefined
  walletAddress: Address | undefined
  eoaAddress: Address | undefined
}) {
  const publicKeyHex = toHex(walletAddress || '')
  const currentDateTime = moment.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
  const DID = {
    '@context': 'https://w3id.org/did/v1',
    id: `did:dis:${chainId}:${pkiAddress}:${walletAddress}`,
    controller: `did:pkh:eip155:${eoaAddress}`,
    authentication: [
      {
        id: `did:pkh:eip155:${eoaAddress}`,
        type: 'Secp256k1VerificationKey2018',
        controller: `did:pkh:eip155:${eoaAddress}`,
        publicKeyHex,
        publicKeyEthers: utils.hexlify(eoaAddress || ''),
      },
    ],
    verificationMethod: [
      {
        id: `did:pkh:eip155:${eoaAddress}`,
        type: 'Secp256k1VerificationKey2018',
        controller: `did:pkh:eip155:${eoaAddress}`,
        publicKeyHex,
      },
    ],
    service: [],
    created: currentDateTime,
    updated: currentDateTime,
  }

  return DID
}
