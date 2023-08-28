import { useLiveQuery } from 'dexie-react-hooks'
import { generateMnemonic, english, mnemonicToAccount, Account } from 'viem/accounts'

import { MnemonicPhraseDB } from '../database'
import { TransactionSerializable } from 'viem'

export const dbMnemonic = new MnemonicPhraseDB()

const WALLET_ID_DEFAULT = 'main'
const ACCOUNTS_DEFAULT = 5

export const useWallet = () => {
  /**
   * Array of session keys from IndexedDB using Dexie's live query.
   * Any changes to the session keys on indexedDB will be reflected in the sessionKeys array automatically.
   *  https://dexie.org/docs/liveQuery()
   */
  const accounts = useLiveQuery(async () => {
    const accounts: Account[] = []
    const wallet = await dbMnemonic.mnemonicPhrase.get(WALLET_ID_DEFAULT)
    if (!wallet) {
      return accounts
    }
    for (let i = 0; i < ACCOUNTS_DEFAULT; i++) {
      const account = mnemonicToAccount(wallet.phrase, {
        accountIndex: i,
      })
      accounts.push(account)
    }
    return accounts
  }, [])

  const saveMnemonicPhrase = async ({ id, mnemonic }: { id: string; mnemonic: string }) => {
    await dbMnemonic.mnemonicPhrase.add({
      id: id,
      phrase: mnemonic,
    })

    return mnemonic
  }

  const generateMnemonicPhrase = (id: string) => {
    const mnemonic = generateMnemonic(english)
    return saveMnemonicPhrase({ id, mnemonic })
  }

  const getStoredMnemonicPhase = async (id: string) => {
    const storedMnemonic = await dbMnemonic.mnemonicPhrase.get(id)
    if (!storedMnemonic) {
      return generateMnemonicPhrase(id)
    }
    return storedMnemonic.phrase
  }

  const getAccount = async (index: number = 0, id: string = 'main') => {
    const storedMnemonicPhrase = await getStoredMnemonicPhase(id)
    const account = mnemonicToAccount(storedMnemonicPhrase, {
      accountIndex: index,
    })

    return account
  }

  const signMessage = async (message: string, index: number = 0, id: string = 'main') => {
    const account = await getAccount(index, id)
    const signature = account.signMessage({
      message,
    })
    return signature
  }

  const signTransaction = async (transaction: TransactionSerializable, index: number = 0, id: string = 'main') => {
    const account = await getAccount(index, id)
    const signature = account.signTransaction(transaction)
    return signature
  }

  return { accounts, getAccount, generateMnemonicPhrase, getStoredMnemonicPhase, signMessage, signTransaction }
}
