import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

const { getSigners } = ethers;

describe('Wallet', () => {
  // Smart Wallet Constants
  const ENTRYPOINT = '0xdEAD000000000000000042069420694206942069';
  const SALT_ONE = 1;

  // Identity Constants
  const URL_MATERIALIZED = 'http://localhost:3000/materialized/{sender}/{data}';

  // Recovery Constants
  const RECOVERY = '0xdEAD000000000000000042069420694206942069';


  // Signers
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;

  // Contract and ContractFactory
  let PKI: Contract;
  let PKIFactory: ContractFactory;

  let Wallet: Contract;
  let WalletFactory: ContractFactory;



  before(async () => {
    [wallet0, wallet1] = await getSigners();
    PKIFactory = await ethers.getContractFactory('PKI');
    PKI = await PKIFactory.deploy(ENTRYPOINT, [URL_MATERIALIZED]);
    WalletFactory = await ethers.getContractFactory('Wallet');
  });

  beforeEach(async () => {

  });

  describe('function execute(address dest, uint256 value, bytes calldata func)', () => {
    it('should SUCCEED to execute a transaction from Smart Wallet owner', async () => {
      expect(false)
    });
  });
});
