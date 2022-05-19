import { Program, setProvider, web3, AnchorProvider, workspace, BN } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { SolanaCodingCamp } from "../target/types/solana_coding_camp";

describe("my_program", () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env();
  setProvider(provider);

  const program = workspace.SolanaCodingCamp as Program<SolanaCodingCamp>;

  // Tạo địa chỉ thuê
  const sumAccount = web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    await program.rpc.initializeSum(new BN(5), {
      accounts: {
        sumAccount: sumAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [sumAccount],
    });

    let sumAccountData = await program.account.sumAccount.fetch(sumAccount.publicKey);
    console.log("sumAccountData", sumAccountData);
  });

});
