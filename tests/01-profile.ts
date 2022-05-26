import {
  web3,
  utils,
  BN,
  Spl,
  AnchorProvider,
  Program,
  workspace,
  setProvider,
} from '@project-serum/anchor'
import { SolanaCodingCamp } from '../target/types/solana_coding_camp'
import { initializeAccount, initializeMint } from './pretest'

describe('SolanaCodingCamp', () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.local()
  setProvider(provider)
  // Program
  const program = workspace.SolanaCodingCamp as Program<SolanaCodingCamp>
  const splProgram = Spl.token()

  let treasurer: web3.PublicKey
  const mint = new web3.Keypair()
  let profileTokenAccount: web3.PublicKey

  let walletTokenAccount: web3.PublicKey
  let ballot: web3.PublicKey

  before(async () => {
    // Init a mint
    await initializeMint(9, mint, provider)

    const [profilePDA, _] = await web3.PublicKey
      .findProgramAddress(
        [
          utils.bytes.utf8.encode("profile"),
          provider.wallet.publicKey.toBuffer()
        ],
        program.programId
      );

    // Derive treasurer account
    const [treasurerPublicKey] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('treasurer'), profilePDA.toBuffer()],
      program.programId,
    )
    treasurer = treasurerPublicKey
    const [ballotPublicKey] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('ballot'),
        profilePDA.toBuffer(),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId,
    )
    ballot = ballotPublicKey

    // Derive token account
    walletTokenAccount = await utils.token.associatedAddress({
      mint: mint.publicKey,
      owner: provider.wallet.publicKey,
    })
    profileTokenAccount = await utils.token.associatedAddress({
      mint: mint.publicKey,
      owner: treasurerPublicKey,
    })

    // Create Token account + Mint to token
    await initializeAccount(
      walletTokenAccount,
      mint.publicKey,
      provider.wallet.publicKey,
      provider,
    )
    await splProgram.rpc.mintTo(new BN(1_000_000_000_000), {
      accounts: {
        mint: mint.publicKey,
        to: walletTokenAccount,
        authority: provider.wallet.publicKey,
      },
    })
  })

  it('initialize profile', async () => {
    const now = Math.floor(new Date().getTime() / 1000)
    const startTime = new BN(now)

    const [profilePDA, _] = await web3.PublicKey
      .findProgramAddress(
        [
          utils.bytes.utf8.encode("profile"),
          provider.wallet.publicKey.toBuffer()
        ],
        program.programId
      );

    await program.rpc.initializeProfile("tuan", startTime, "a@a.com", "link", "key", {
      accounts: {
        authority: provider.wallet.publicKey,
        profile: profilePDA,
        treasurer,
        mint: mint.publicKey,
        profileTokenAccount,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [],
    })

    let profileData = await program.account.profile.fetch(profilePDA);
    console.log("profileData", profileData);
  })

  it('update profile', async () => {
    const now = Math.floor(new Date().getTime() / 1000)
    const startTime = new BN(now)

    const [profilePDA, _] = await web3.PublicKey
      .findProgramAddress(
        [
          utils.bytes.utf8.encode("profile"),
          provider.wallet.publicKey.toBuffer()
        ],
        program.programId
      );

    await program.rpc.updateProfile("zil", startTime, "zil@zil.com", "link_link", "key_zil", {
      accounts: {
        authority: provider.wallet.publicKey,
        profile: profilePDA,
        treasurer,
        mint: mint.publicKey,
        profileTokenAccount,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [],
    })

    let profileData = await program.account.profile.fetch(profilePDA);
    console.log("profileData", profileData);
  })

})
