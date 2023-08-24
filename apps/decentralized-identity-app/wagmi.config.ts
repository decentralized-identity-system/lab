import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { PKIAbi } from './contracts/abi/PKI'

export default defineConfig({
  out: 'lib/generated/blockchain.ts',
  contracts: [
    {
      name: 'pki',
      abi: PKIAbi,
    },
  ],
  plugins: [react()],
})
