import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { SolanaCodingCamp } from '../target/types/solana_coding_camp';
import { expect } from 'chai';

describe('pda-hashmap', async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.SolanaCodingCamp as Program<SolanaCodingCamp>;

    it('Sets and changes name!', async () => {
        const [userStatsPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-stats"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );

        await program.methods
            .createUserStats("brian")
            .accounts({
                user: provider.wallet.publicKey,
                userStats: userStatsPDA,
            })
            .rpc();

        expect((await program.account.userStats.fetch(userStatsPDA)).name).to.equal("brian");

        await program.methods
            .changeUserName("tom")
            .accounts({
                user: provider.wallet.publicKey,
                userStats: userStatsPDA
            })
            .rpc();

        expect((await program.account.userStats.fetch(userStatsPDA)).name).to.equal("tom");
    });
});
