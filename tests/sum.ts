import { Program, setProvider, web3, AnchorProvider, workspace, BN } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { SolanaCodingCamp } from "../target/types/solana_coding_camp";

describe("solana_coding_camp", async () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env();
  setProvider(provider);

  const program = workspace.SolanaCodingCamp as Program<SolanaCodingCamp>;

  // Tạo địa chỉ thuê
  const sumAccount = web3.Keypair.generate();
  console.log("sumAccount", sumAccount);

  it("Sum initialized!", async () => {
    await program.rpc.initializeSum(new BN(5), {
      accounts: {
        sumAccount: sumAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [sumAccount],
    });

    let sumAccountData = await program.account.sum.fetch(sumAccount.publicKey);
    console.log("sumAccountData", sumAccountData);
  });

  it("Update sum", async () => {
    await program.rpc.updateSum(new BN(3), {
      accounts: {
        sumAccount: sumAccount.publicKey,
      }
    });

    let sumAccountData = await program.account.sum.fetch(sumAccount.publicKey);
    console.log("sumAccountData", sumAccountData);
  });

});