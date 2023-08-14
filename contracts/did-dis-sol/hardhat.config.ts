import 'dotenv/config';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-dependency-compiler';
import 'hardhat-abi-exporter';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { HardhatUserConfig } from 'hardhat/config';
import networks from './hardhat.network';

const optimizerEnabled = !process.env.OPTIMIZER_DISABLED;

const config: HardhatUserConfig = {
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    flat: false,
    except: ['./abis/ERC20.sol', './abis/ERC721.sol'],
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  mocha: {
    timeout: 30000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks,
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 200,
          },
          evmVersion: 'london',
        },
      }
    ]
  },
  // external: {
  //   contracts: [
  //       {
  //           artifacts: 'node_modules/@semaphore-protocol/contracts/artifacts',
  //       },
  //   ],
  // },
  dependencyCompiler: {
      paths: [
          '@semaphore-protocol/contracts/base/Pairing.sol',
          '@semaphore-protocol/contracts/base/SemaphoreGroups.sol',
          '@semaphore-protocol/contracts/base/SemaphoreVerifier.sol',
          '@semaphore-protocol/contracts/Semaphore.sol',
      ],
  },
};

export default config;
