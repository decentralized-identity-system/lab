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

describe('Recovery', () => {
  // Smart Wallet Constants
  const ENTRYPOINT = '0xdEAD000000000000000042069420694206942069';
  const SALT_ONE = 1;

  // Identity Constants
  const URL_COUNTERFACTUAL = 'http://localhost:3000/materialized/{sender}/{data}';
  const URL_MATERIALIZED = 'http://localhost:3000/materialized/{sender}/{data}';

  // Recovery | Semaphore Constants
  const GROUP_ID = BigNumber.from(1).toHexString();
  const SIGNAL = 'SEMAPHORE'
  const TOP_SECRET_MESSAGE = 'TOP_SECRET_MESSAGE'
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
    const pairing = await PairingFactory.deploy()
    await pairing.deployed()

    const SemaphoreVerifierFactory = await ethers.getContractFactory("SemaphoreVerifier", {
      libraries: {
        Pairing: pairing.address
    }})

    const semaphoreVerifier = await SemaphoreVerifierFactory.deploy()
    await semaphoreVerifier.deployed()

    const poseidonABI = poseidonContract.generateABI(2)
                    const poseidonBytecode = poseidonContract.createCode(2)

    const [signer] = await ethers.getSigners()
    const PoseidonFactory = new ethers.ContractFactory(poseidonABI, poseidonBytecode, signer)
    const poseidon = await PoseidonFactory.deploy()
    await poseidon.deployed()

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

    RecoveryFactory = await ethers.getContractFactory('Recovery');
    Recovery = await RecoveryFactory.deploy(Semaphore.address, GROUP_ID);

  });

  beforeEach(async () => {
    // Wallet = await WalletFactory.deploy(ethers.constants.AddressZero, PKI.address, wallet0.address, [URL_MATERIALIZED],);
  });

  describe('function addGuardianFromCounterfactualWallet(address pki, uint256 salt, uint256 identityCommitment, bytes calldata ownerSignture)', () => {
    it('should SUCCEED to recover Smart Wallet using Recovery', async () => {
      // Generate Identity
      const groupCreateSignature = await wallet0.signMessage(ethers.utils.arrayify(ethers.utils.solidityKeccak256(["address", "uint256"], [PKI.address, SALT_ONE])));
      await Recovery.createGuardianGroupFromCounterfactualWallet(PKI.address, SALT_ONE, groupCreateSignature);

      // Generate Identity
      const identity = new Identity(TOP_SECRET_MESSAGE)
      const commitment = identity.commitment.toString()

      // Generate Signature
      const commitmentSignature = await wallet0.signMessage(ethers.utils.arrayify(ethers.utils.solidityKeccak256(["uint256"], [commitment])));

      const recovery = (await ethers.getContractAt('Recovery', Recovery.address)).connect(wallet0);
      const groupCreated = recovery.addGuardianFromCounterfactualWallet(PKI.address, SALT_ONE, commitment, commitmentSignature)
      await expect(groupCreated)
        .to.emit(Recovery, "GuardianAdded")
    });
  });

  describe('function recoverWallet(uint256 merkleTreeRoot, uint256 signal, uint256 nullifierHash, uint256[8] calldata proof, Wallet wallet, address oldOwner, address newOwner) ', () => {
    it('should SUCCEED to recover Smart Wallet using Recovery', async () => {
      // constructor(address _entry, address _pki, address _recovery, address _owner, string[] memory __urls)
      const wallet = await WalletFactory.deploy(ENTRYPOINT, PKI.address, Recovery.address, wallet0.address, [URL_MATERIALIZED]);
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
