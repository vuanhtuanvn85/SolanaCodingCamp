import { Program, setProvider, web3, AnchorProvider, workspace, BN } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { SolanaCodingCamp } from "../target/types/solana_coding_camp";

describe("solana_coding_camp", async () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env();
  setProvider(provider);

  const program = workspace.SolanaCodingCamp as Program<SolanaCodingCamp>;

  // Tạo địa chỉ thuê

  //Client muốn read/write account vote
  //Bằng cách sử dụng findProgramAddress, bạn không cần phải lưu trữ Public key
  //thay vào đó, bạn có thể dễ dàng tìm được một địa chỉ PDA nhờ vào seed, programId để thuê nó 
  //hoặc đọc và cập nhật dữ liệu
  const [voteAccount, voteAccountBump] = await web3.PublicKey.findProgramAddress(
    [Buffer.from("seed")],
    program.programId
  );
  console.log("voteAccount", voteAccount);
  console.log("voteAccountBump", voteAccountBump);
  console.log("program.programId", program.programId.toBase58());


  it("Vote initialized!", async () => {
    await program.rpc.initializeVoteFood(voteAccountBump, {
      accounts: {
        voteFoodAccount: voteAccount,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      }
    });

    let voteAccountData = await program.account.voteFood.fetch(voteAccount);
    console.log("sumAccountData", voteAccountData);
  });

  it("Vote pizza!", async () => {
    await program.rpc.votePizza({
      accounts: {
        voteFoodAccount: voteAccount,
      }
    });

    let voteAccountData = await program.account.voteFood.fetch(voteAccount);
    console.log("sumAccountData", voteAccountData);
  });

  it("Vote hamburger!", async () => {
    await program.rpc.voteHamburger({
      accounts: {
        voteFoodAccount: voteAccount,
      }
    });

    let voteAccountData = await program.account.voteFood.fetch(voteAccount);
    console.log("sumAccountData", voteAccountData);
  });

});