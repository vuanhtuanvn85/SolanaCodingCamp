import * as anchor from '@project-serum/anchor'
import { clusterApiUrl } from '@solana/web3.js'

import { IDL } from './idl'

export const DEFAULT_COMMITMENT = 'confirmed'
export const DEFAULT_CLUSTER = 'devnet'
export const PROGRAM_ADDRESS = new anchor.web3.PublicKey(
  'FJ1ddJSwnigDNeyMqC1YD9RZzkykkq7ifXCm7pTnUVX4',
)
export const NODE_URL = clusterApiUrl(DEFAULT_CLUSTER)

export type ProfileData = {
  full_name: String,
  birthday: number,
  email: String,
  is_email_verified: boolean,
  ipfs_link: String,
  ipfs_key: String,
}

// Function support
export const getProvider = (wallet: any) => {
  const connection = new anchor.web3.Connection(NODE_URL, DEFAULT_COMMITMENT)
  return new anchor.Provider(connection, wallet, {
    preflightCommitment: DEFAULT_COMMITMENT,
  })
}

export const getProgram = (wallet: any) => {
  const provider = getProvider(wallet)
  return new anchor.Program(IDL, PROGRAM_ADDRESS, provider)
}
