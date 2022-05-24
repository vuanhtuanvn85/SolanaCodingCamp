import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { expect } from 'chai';
import { SolanaCodingCamp } from '../target/types/solana_coding_camp';
import { PuppetMaster } from '../target/types/puppet_master';

describe('puppet', () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const puppetProgram = anchor.workspace.SolanaCodingCamp as Program<SolanaCodingCamp>;
    const puppetMasterProgram = anchor.workspace.PuppetMaster as Program<PuppetMaster>;

    const puppetKeypair = Keypair.generate();
    const authorityKeypair = Keypair.generate();

    it('Does CPI!', async () => {
        const [puppetMasterPDA, puppetMasterBump] = await PublicKey
            .findProgramAddress([], puppetMasterProgram.programId);

        await puppetProgram.methods
            .initializePuppet(puppetMasterPDA)
            .accounts({
                puppet: puppetKeypair.publicKey,
                user: provider.wallet.publicKey,
            })
            .signers([puppetKeypair])
            .rpc();


        await puppetMasterProgram.methods
            .pullStrings(puppetMasterBump, new anchor.BN(42))
            .accounts({
                puppetProgram: puppetProgram.programId,
                puppet: puppetKeypair.publicKey,
                authority: puppetMasterPDA
            })
            .rpc();

        expect((await puppetProgram.account.puppetData
            .fetch(puppetKeypair.publicKey)).data.toNumber()).to.equal(42);
    });
});
