import { AnchorProvider, Program, setProvider, web3, workspace, Wallet } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { expect } from 'chai';
import { SolanaCodingCamp } from "../target/types/solana_coding_camp";

async function play(program: Program<SolanaCodingCamp>, game, player,
    tile, expectedTurn, expectedGameState, expectedBoard) {
    await program.methods
        .play(tile)
        .accounts({
            player: player.publicKey,
            game
        })
        .signers(player instanceof (Wallet as any) ? [] : [player])
        .rpc();

    const gameState = await program.account.game.fetch(game);
    expect(gameState.turn).to.equal(expectedTurn);
    expect(gameState.state).to.eql(expectedGameState);
    expect(gameState.board)
        .to
        .eql(expectedBoard);
}


describe("solana_coding_camp", async () => {
    // Configure the client to use the local cluster.
    const provider = AnchorProvider.env();
    setProvider(provider);

    const program = workspace.SolanaCodingCamp as Program<SolanaCodingCamp>;

    // Tạo địa chỉ thuê
    const sumAccount = web3.Keypair.generate();
    console.log("sumAccount", sumAccount);

    it('setup game!', async () => {
        const gameKeypair = web3.Keypair.generate();
        const playerOne = (program.provider as AnchorProvider).wallet;
        const playerTwo = web3.Keypair.generate();
        await program.methods
            .setupGame(playerTwo.publicKey)
            .accounts({
                game: gameKeypair.publicKey,
                playerOne: playerOne.publicKey,
            })
            .signers([gameKeypair])
            .rpc();
        // await program.rpc.setupGame(playerTwo.publicKey, {
        //     accounts: {
        //         game: gameKeypair.publicKey,
        //         playerOne: playerOne.publicKey,
        //         systemProgram: SystemProgram.programId,
        //     },
        //     signers: [gameKeypair]
        // });

        let gameState = await program.account.game.fetch(gameKeypair.publicKey);
        expect(gameState.turn).to.equal(1);
        expect(gameState.players)
            .to
            .eql([playerOne.publicKey, playerTwo.publicKey]);
        expect(gameState.state).to.eql({ active: {} });
        expect(gameState.board)
            .to
            .eql([[null, null, null], [null, null, null], [null, null, null]]);
    });

    it('player one wins', async () => {
        const gameKeypair = web3.Keypair.generate();
        const playerOne = (program.provider as AnchorProvider).wallet;
        const playerTwo = web3.Keypair.generate();
        await program.methods
            .setupGame(playerTwo.publicKey)
            .accounts({
                game: gameKeypair.publicKey,
                playerOne: playerOne.publicKey,
            })
            .signers([gameKeypair])
            .rpc();

        let gameState = await program.account.game.fetch(gameKeypair.publicKey);
        expect(gameState.turn).to.equal(1);
        expect(gameState.players)
            .to
            .eql([playerOne.publicKey, playerTwo.publicKey]);
        expect(gameState.state).to.eql({ active: {} });
        expect(gameState.board)
            .to
            .eql([[null, null, null], [null, null, null], [null, null, null]]);

        await play(
            program,
            gameKeypair.publicKey,
            playerOne,
            { row: 0, column: 0 },
            2,
            { active: {}, },
            [
                [{ x: {} }, null, null],
                [null, null, null],
                [null, null, null]
            ]
        );

        await play(
            program,
            gameKeypair.publicKey,
            playerTwo,
            { row: 0, column: 1 },
            3,
            { active: {}, },
            [
                [{ x: {} }, { o: {} }, null],
                [null, null, null],
                [null, null, null]
            ]
        );

        await play(
            program,
            gameKeypair.publicKey,
            playerOne,
            { row: 1, column: 0 },
            4,
            { active: {}, },
            [
                [{ x: {} }, { o: {} }, null],
                [{ x: {} }, null, null],
                [null, null, null]
            ]
        );

        await play(
            program,
            gameKeypair.publicKey,
            playerTwo,
            { row: 0, column: 2 },
            5,
            { active: {}, },
            [
                [{ x: {} }, { o: {} }, { o: {} }],
                [{ x: {} }, null, null],
                [null, null, null]
            ]
        );

        await play(
            program,
            gameKeypair.publicKey,
            playerOne,
            { row: 2, column: 0 },
            5,
            {
                won: {
                    winner: playerOne.publicKey
                },
            },
            [
                [{ x: {} }, { o: {} }, { o: {} }],
                [{ x: {} }, null, null],
                [{ x: {} }, null, null]
            ]
        );
    });


});