import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { BN } from "bn.js";
import { SolanaCodingCamp } from "../target/types/solana_coding_camp";

describe("SolanaCodingCamp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaCodingCamp as Program<SolanaCodingCamp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initializeSum(new BN(1)).rpc();
    console.log("Your transaction signature", tx);
  });
});
