import {
  useWalletKit,
  useSolana,
  useConnectedWallet,
} from "@gokiprotocol/walletkit";
import { Button, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Counter from "./components/counter";
import WalletInfo from "./components/walletInfo";
import { AppDispatch } from "./store";
import { setWalletInfo, WalletState } from "./store/wallet.reducer";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { AccountLayout, TOKEN_PROGRAM_ID, createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [walletAddress, setWalletAdress] = useState<string>("");



  // Goki hooks
  const wallet = useConnectedWallet();
  const { connect } = useWalletKit();
  const { disconnect, providerMut } = useSolana();
  const dispatch = useDispatch<AppDispatch>();

  const fetchBalance = useCallback(async () => {
    let walletInfo: WalletState = {
      walletAddress: wallet?.publicKey.toBase58() || "",
      balance: 0,
    };

    if (wallet && providerMut) {
      walletInfo.balance = await providerMut.connection.getBalance(
        wallet.publicKey
      );

      // Using web3.js
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); const airdropSignature = await connection.requestAirdrop(
        wallet.publicKey,
        LAMPORTS_PER_SOL,
      );

      // // airdrop
      // let myTxn = await connection.confirmTransaction(airdropSignature);

      // get token balance
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        wallet.publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
      let tokenBalance = 0;
      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);
        if (accountInfo.mint.toString() === '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA') {
          tokenBalance = Number(accountInfo.amount);
          console.log(tokenBalance.toLocaleString());
        }
      })



    }
    dispatch(setWalletInfo(walletInfo));
    setBalance(walletInfo.balance);
    setWalletAdress(walletInfo.walletAddress);
    console.log(walletInfo);
  }, [wallet, providerMut]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <Row justify="center">
      <Col>
        <WalletInfo address={walletAddress} balance={balance} />
      </Col>
      {/* Button connect wallet */}
      <Col span={24} style={{ textAlign: "center" }}>
        {wallet ? (
          <Button type="primary" onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          // Call connectWallet function when click Button
          <Button type="primary" onClick={connect}>
            Connect Wallet
          </Button>
        )}
      </Col>
      {/* <Col>
        <Counter />
      </Col> */}
    </Row>
  );
}

export default App;
