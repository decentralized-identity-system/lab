import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { PKIAbi } from './contracts/abi/PKI'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'lib/generated/blockchain.ts',
  plugins: [
    react(),
    hardhat({
      project: '../../contracts/did-dis-sol',
    }),
  ],
})
