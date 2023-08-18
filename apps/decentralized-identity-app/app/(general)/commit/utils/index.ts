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
}: {
  pkiAddress: string
  chainId: number | undefined
  walletAddress: string | undefined
}) {
  const DID = { '@context': 'https://www.w3.org/ns/did/v1', id: `did:dis:${chainId}:${pkiAddress}:${walletAddress}` }
  return DID
}
