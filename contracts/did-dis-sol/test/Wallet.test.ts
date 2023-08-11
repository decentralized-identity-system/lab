import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

const { provider } = ethers;
const { getSigners } = ethers;
const ABI_CODER = new ethers.utils.AbiCoder

describe.only('Wallet', () => {
  // Signers
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;

  // Contract and ContractFactory
  let PKI: Contract;
  let PKIFactory: ContractFactory;

  let Wallet: Contract;
  let WalletFactory: ContractFactory;

  // Constants
  const ENTRYPOINT = "0xdEAD000000000000000042069420694206942069"
  const URL_COUNTERFACTUAL = 'http://localhost:3000/materialized/{sender}';
  const URL_MATERIALIZED = 'http://localhost:3000/materialized/{sender}';

  // DID Document Object using Wallet0 address
  let DID = {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: "did:dis:10:0x5FbDB2315678afecb367f032d93F642f64180aa3:0x0cFd869c63b828C28b758A7a96B15E62Be013a22",
  }

  before(async () => {
    [wallet0, wallet1 ] = await getSigners();
    PKIFactory = await ethers.getContractFactory('PKI');    
    PKI = await PKIFactory.deploy(ENTRYPOINT, [URL_COUNTERFACTUAL]);
    WalletFactory = await ethers.getContractFactory('Wallet');
  });

  beforeEach(async () => {
    // Wallet = await WalletFactory.deploy(ethers.constants.AddressZero, PKI.address, wallet0.address, [URL_MATERIALIZED],);
  });

  // describe('function did() external view', () => {
  //   it('should SUCCEED to resolve the Smart Wallet DID', async () => {
  //     const data = await provider.call({
  //       to: Wallet.address,
  //       data: Wallet.interface.encodeFunctionData('did', []),
  //       ccipReadEnabled: true,
  //     })

  //     const [decoded] = ABI_CODER.decode(['string'], data)
  //     const DID_OBJECT = JSON.parse(decoded)  
  //     expect(DID_OBJECT).to.deep.equal(DID)
  //   });
  // });
});
