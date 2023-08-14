// @ts-ignore
import { poseidon_gencontract as poseidonContract } from "circomlibjs"
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group"
import { generateProof } from "@semaphore-protocol/proof"
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory, utils } from 'ethers';
import { ethers } from 'hardhat';

const { getSigners } = ethers;

describe.only('Recovery', () => {
  // Constants
  const ENTRYPOINT = '0xdEAD000000000000000042069420694206942069';
  const GROUP_ID = BigNumber.from(1).toHexString();
  const SIGNAL = 'SEMAPHORE'
  const TOP_SECRET_MESSAGE = 'TOP_SECRET_MESSAGE'
  const SALT_ONE = 1;
  const URL_COUNTERFACTUAL = 'http://localhost:3000/materialized/{sender}/{data}';

  const wasmFilePath = `./build/snark-artifacts/semaphore.wasm`
  const zkeyFilePath = `./build/snark-artifacts/semaphore.zkey`

  // Signers
  let wallet0: SignerWithAddress;
  let wallet1: SignerWithAddress;

  // Contract and ContractFactory
  let PKI: Contract;
  let PKIFactory: ContractFactory;

  let Wallet: Contract;
  let WalletFactory: ContractFactory;
  
  // Recovery | Semaphore Contracts
  let Recovery: Contract;
  let RecoveryFactory: ContractFactory;
  before(async () => {
    [wallet0, wallet1] = await getSigners();
    PKIFactory = await ethers.getContractFactory('PKI');
    PKI = await PKIFactory.deploy(ENTRYPOINT, [URL_COUNTERFACTUAL]);
    WalletFactory = await ethers.getContractFactory('Wallet');

    // Recovery | Semaphore Contracts
    const PairingFactory = await ethers.getContractFactory('Pairing');
    const Pairing = await PairingFactory.deploy();
    const pairing = await PairingFactory.deploy()
    await pairing.deployed()
    console.info(`Pairing library has been deployed to: ${pairing.address}`)

    const SemaphoreVerifierFactory = await ethers.getContractFactory("SemaphoreVerifier", {
      libraries: {
        Pairing: pairing.address
    }})

    const semaphoreVerifier = await SemaphoreVerifierFactory.deploy()
    await semaphoreVerifier.deployed()

    console.info(`SemaphoreVerifier contract has been deployed to: ${semaphoreVerifier.address}`)

    const poseidonABI = poseidonContract.generateABI(2)
                    const poseidonBytecode = poseidonContract.createCode(2)

    const [signer] = await ethers.getSigners()
    const PoseidonFactory = new ethers.ContractFactory(poseidonABI, poseidonBytecode, signer)
    const poseidon = await PoseidonFactory.deploy()

    await poseidon.deployed()
    console.info(`Poseidon library has been deployed to: ${poseidon.address}`)

    const IncrementalBinaryTreeFactory = await ethers.getContractFactory("IncrementalBinaryTree", {
      libraries: {
          PoseidonT3: poseidon.address
      }
    })
    const incrementalBinaryTree = await IncrementalBinaryTreeFactory.deploy()

    await incrementalBinaryTree.deployed()

    const SemaphoreFactory = await ethers.getContractFactory("Semaphore", {
      libraries: {
          IncrementalBinaryTree: incrementalBinaryTree.address
      }
    })

    const Semaphore = await SemaphoreFactory.deploy(semaphoreVerifier.address)

    await Semaphore.deployed()

    console.info(`Semaphore contract has been deployed to: ${Semaphore.address}`)
    RecoveryFactory = await ethers.getContractFactory('Recovery');
    Recovery = await RecoveryFactory.deploy(Semaphore.address, GROUP_ID);

  });

  beforeEach(async () => {
    // Wallet = await WalletFactory.deploy(ethers.constants.AddressZero, PKI.address, wallet0.address, [URL_MATERIALIZED],);
  });

  describe('function did() external view', () => {
    it('should SUCCEED to recover Smart Wallet using Recovery', async () => {
      const address = await PKI.computeAddress(Recovery.address, wallet0.address, SALT_ONE);
      // constructor(address _entry, address _pki, address _recovery, address _owner, string[] memory __urls)
      const wallet = await WalletFactory.deploy(ethers.constants.AddressZero, PKI.address, Recovery.address, wallet0.address, [URL_COUNTERFACTUAL]);
      await wallet.deployed();

      const identity = new Identity(TOP_SECRET_MESSAGE)
      const recovery = (await ethers.getContractAt('Recovery', Recovery.address)).connect(wallet0);
      // Add wallet to recovery group
      await recovery.joinGroup(identity.commitment.toString())

      const group = new Group(GROUP_ID)
      // @ts-ignore
      group.addMembers([identity.commitment.toString()])
      const signal = BigNumber.from(utils.formatBytes32String(SIGNAL)).toString()
      const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
        identity,
        group,
        GROUP_ID,
        signal, {
            wasmFilePath,
            zkeyFilePath
        }
    )

    expect(await wallet.isOwner(wallet0.address)).to.be.true;

    await recovery.recoverWallet(
      merkleTreeRoot,
      signal,
      nullifierHash,
      proof,
      wallet.address,
      wallet0.address,
      wallet1.address,
    ) 
    expect(await wallet.isOwner(wallet1.address)).to.be.true;
    });
  });
});
