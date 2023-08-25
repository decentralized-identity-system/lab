// Generated by @wagmi/cli@1.1.0 on 8/25/2023 at 12:39:16 PM
import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi'
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pki
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pkiABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_entry', internalType: 'address', type: 'address' },
      { name: '_urls', internalType: 'string[]', type: 'string[]' },
    ],
  },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'urls', internalType: 'string[]', type: 'string[]' },
      { name: 'callData', internalType: 'bytes', type: 'bytes' },
      { name: 'callbackFunction', internalType: 'bytes4', type: 'bytes4' },
      { name: 'extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'OffchainLookup',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'recovery', internalType: 'address', type: 'address' },
      { name: 'walletOwner', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recovery', internalType: 'address', type: 'address' },
      { name: 'walletOwner', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deployWallet',
    outputs: [{ name: '', internalType: 'contract Wallet', type: 'address' }],
  },
  { stateMutability: 'view', type: 'function', inputs: [{ name: 'id', internalType: 'string', type: 'string' }], name: 'did', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'response', internalType: 'bytes', type: 'bytes' },
      { name: 'extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'document',
    outputs: [{ name: 'DID', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'isWallet',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'response', internalType: 'bytes', type: 'bytes' },
      { name: 'extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'resolve',
    outputs: [{ name: 'DID', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'urls',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'walletExists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__.
 */
export function usePkiRead<TFunctionName extends string, TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi'> = {} as any
) {
  return useContractRead({ abi: pkiABI, ...config } as UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"computeAddress"`.
 */
export function usePkiComputeAddress<TFunctionName extends 'computeAddress', TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: pkiABI, functionName: 'computeAddress', ...config } as UseContractReadConfig<
    typeof pkiABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"did"`.
 */
export function usePkiDid<TFunctionName extends 'did', TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: pkiABI, functionName: 'did', ...config } as UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"document"`.
 */
export function usePkiDocument<TFunctionName extends 'document', TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: pkiABI, functionName: 'document', ...config } as UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"isWallet"`.
 */
export function usePkiIsWallet<TFunctionName extends 'isWallet', TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: pkiABI, functionName: 'isWallet', ...config } as UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"resolve"`.
 */
export function usePkiResolve<TFunctionName extends 'resolve', TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: pkiABI, functionName: 'resolve', ...config } as UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"urls"`.
 */
export function usePkiUrls<TFunctionName extends 'urls', TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: pkiABI, functionName: 'urls', ...config } as UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"walletExists"`.
 */
export function usePkiWalletExists<TFunctionName extends 'walletExists', TSelectData = ReadContractResult<typeof pkiABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: pkiABI, functionName: 'walletExists', ...config } as UseContractReadConfig<typeof pkiABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pkiABI}__.
 */
export function usePkiWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof pkiABI, string>['request']['abi'], TFunctionName, TMode>
    : UseContractWriteConfig<typeof pkiABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof pkiABI, TFunctionName, TMode>({ abi: pkiABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"deployWallet"`.
 */
export function usePkiDeployWallet<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof pkiABI, 'deployWallet'>['request']['abi'], 'deployWallet', TMode> & {
        functionName?: 'deployWallet'
      }
    : UseContractWriteConfig<typeof pkiABI, 'deployWallet', TMode> & {
        abi?: never
        functionName?: 'deployWallet'
      } = {} as any
) {
  return useContractWrite<typeof pkiABI, 'deployWallet', TMode>({ abi: pkiABI, functionName: 'deployWallet', ...config } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pkiABI}__.
 */
export function usePreparePkiWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof pkiABI, TFunctionName>, 'abi'> = {} as any
) {
  return usePrepareContractWrite({ abi: pkiABI, ...config } as UsePrepareContractWriteConfig<typeof pkiABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pkiABI}__ and `functionName` set to `"deployWallet"`.
 */
export function usePreparePkiDeployWallet(
  config: Omit<UsePrepareContractWriteConfig<typeof pkiABI, 'deployWallet'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: pkiABI, functionName: 'deployWallet', ...config } as UsePrepareContractWriteConfig<
    typeof pkiABI,
    'deployWallet'
  >)
}
