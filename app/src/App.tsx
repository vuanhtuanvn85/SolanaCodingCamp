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
