import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory } from 'ethers';
import hre, { ethers } from 'hardhat';

const { provider } = ethers;
const { getSigners } = ethers;
const ABI_CODER = new ethers.utils.AbiCoder

describe.only('PublicKeyInfrastructure', () => {
  // Signers
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;

  // Contract and ContractFactory
  let PKI: Contract;
  let PKIFactory: ContractFactory;

  // Constants
  const ENTRYPOINT = "0xdEAD000000000000000042069420694206942069"
  const SALT_ONE = 1;
  const SALT_TWO = 2;
  const SALT_THREE = 3;
  const URL_COUNTERFACTUAL = 'http://localhost:3000/counterfactual/{sender}/{data}';
  const URL_MATERIALIZED = 'http://localhost:3000/materialized/{sender}/{data}';
  
  // DID Document Object
  const DID_ID = "did:dis:10:0x5FbDB2315678afecb367f032d93F642f64180aa3:0x0cFd869c63b828C28b758A7a96B15E62Be013a22"
  const DID = {
   '@context': 'https://www.w3.org/ns/did/v1',
   id: DID_ID
  }
  before(async () => {
    [wallet0, wallet1 ] = await getSigners();
    PKIFactory = await ethers.getContractFactory('PKI');    
    PKI = await PKIFactory.deploy(ENTRYPOINT, [URL_COUNTERFACTUAL]);
    
    /** 
     * HACKY WAY TO GENERATE DATA for Identity Hub test server
     * Uncomment the lines below to get the values needed for the `identity-hub-test-server` module.
     */

    // const did_hash = ethers.utils.solidityKeccak256(["string"], [JSON.stringify(DID)])
    // const did_signature = await wallet0.signMessage(ethers.utils.arrayify(did_hash))
    // const walletSignature = await wallet0.signMessage(ethers.utils.arrayify(ethers.utils.solidityKeccak256(["address", "address", "uint256"], [PKI.address, wallet0.address, SALT_ONE])));
    // const walletAddress = await PKI.computeAddress(wallet0.address, SALT_ONE);
    // console.log(PKI.address, 'PKI.address')
    // console.log(did_signature, 'did_signature')
    // console.log(walletSignature, 'walletSignature')
    // console.log(walletAddress, 'address')
  });

  beforeEach(async () => {
    // await hre.network.provider.send("hardhat_reset")
  });

  describe('function did(string calldata id) external view', () => {

    it('should SUCCEED to resolve a DID document via a counterfactual Smart Wallet', async () => {
      const data = await provider.call({
        to: PKI.address,
        data: PKI.interface.encodeFunctionData('did', [DID_ID]),
        ccipReadEnabled: true,
      })
      const [decoded] = ABI_CODER.decode(['string'], data)
      const DID_OBJECT = JSON.parse(decoded)  
      expect(DID_OBJECT).to.deep.equal(DID)
    });
    
    it('should SUCCEED to resolve a DID document via a materialized Smart Wallet', async () => {
      const address = await PKI.computeAddress(wallet0.address, SALT_ONE);
      await PKI.deployWallet(wallet0.address, SALT_ONE);

      const wallet = (await ethers.getContractAt('Wallet', address)).connect(wallet0);

      await wallet.setUrls([URL_MATERIALIZED]);

      const data = await provider.call({
        to: PKI.address,
        data: PKI.interface.encodeFunctionData('did', [DID_ID]),
        ccipReadEnabled: true,
      })

      const [decoded] = ABI_CODER.decode(['string'], data)
      const DID_OBJECT = JSON.parse(decoded)  
      expect(DID_OBJECT).to.deep.equal(DID)
    });

  });

  describe('computeAddress(address entryPoint, address walletOwner, uint256 salt)', () => {
    it('should SUCCEED to get compute a future Smart Wallet address', async () => {
      const address = await PKI.computeAddress(wallet0.address, SALT_ONE);
      expect(address).to.equal('0x0cFd869c63b828C28b758A7a96B15E62Be013a22');
    });
  });
  
  describe('deployWallet(address entryPoint, address walletOwner, uint256 salt)', () => {
    it('should SUCCEED to get a future Smart Wallet address matching the computed address', async () => {
      const address = await PKI.computeAddress(wallet0.address, SALT_THREE);

      const counterfactual = await PKI.isWallet(address);
      await PKI.deployWallet(wallet0.address, SALT_THREE);
      const materialized = await PKI.isWallet(address);

      expect(counterfactual).to.equal(false);
      expect(materialized).to.equal(true);
    });
  });
  
});
