const Wallet = {
    id: 'did:dis:1:0x123:0x123',
    metadata: {
        chainId: 1,
        creator: '0x123',
        address: '0x123',
        salt: 1,
        pki: '0x123',
        recovery: '0x123',
    },
    commitments: {
        wallet: '0x123',
        identity: '0x123',
    },
    identity: {
        hex: '0x123',
        document: {
            id: '1',
            '@context': 'https://www.w3.org/ns/did/v1',
            publicKey: [
                {
                    id: '1',
                    type: 'Secp256k1VerificationKey2018',
                    controller: '0x123',
                    ethereumAddress: '0x123',
                },
            ],
        }  
    }
}