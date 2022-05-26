import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useWalletKit, useSolana, useConnectedWallet } from '@gokiprotocol/walletkit'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { web3, utils, BN } from '@project-serum/anchor'

import { Button, Col, Layout, Row, Space, Typography } from 'antd'

import { setWalletInfo, WalletState } from 'store/wallet.reducer'
import { AppDispatch } from 'store'
import CreateProfile from 'view/createProfile';
import EditProfile from 'view/editProfile';
import { getProgram } from '../../config'

const mintAddress = '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA';

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [walletAddress, setWalletAdress] = useState<string>("");
  const [hasProfile, setHasProfile] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [birthday, setBirthday] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>()
  const wallet = useConnectedWallet()
  const { connect } = useWalletKit()
  const { disconnect, providerMut } = useSolana()

  const fetchWalletInfo = useCallback(async () => {
    if (!wallet || !providerMut) return
    const lamports = await providerMut.connection.getBalance(wallet.publicKey)

    let tokenAccount = await utils.token.associatedAddress({
      mint: new PublicKey(mintAddress),
      owner: wallet.publicKey,
    })
    const tokenBalanceInfo = await providerMut.connection.getTokenAccountBalance(tokenAccount);
    // console.log("token balance (method 2): ", tokenBalanceInfo.value.uiAmount);

    let walletInfo: WalletState = {
      walletAddress: wallet.publicKey.toBase58(),
      balance: lamports,
      tokenBalance: tokenBalanceInfo.value.uiAmount ? tokenBalanceInfo.value.uiAmount : 0,
    }
    dispatch(setWalletInfo(walletInfo))
    // console.log(walletInfo);
    setBalance(walletInfo.balance)
    setTokenBalance(walletInfo.tokenBalance)
    setWalletAdress(walletInfo.walletAddress)

    const program = getProgram(wallet)
    const [profilePDA, _] = await web3.PublicKey
      .findProgramAddress(
        [
          utils.bytes.utf8.encode("profile"),
          wallet.publicKey.toBuffer()
        ],
        program.programId
      );
    // console.log('profilePDA', profilePDA.toBase58());
    try {
      let profileData = await program.account.profile.fetch(profilePDA);
      console.log("profileData", profileData);
      setFullName(profileData.fullName);
      setEmailAddress(profileData.email);
      setBirthday(Number(profileData.birthday));
    } catch (error) {
      setHasProfile(false)
    }
  }, [providerMut, wallet])

  useEffect(() => {
    fetchWalletInfo()
  }, [fetchWalletInfo])



  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header>
        <Row justify="end">
          <Col span={4}>
            <Typography.Text style={{ color: 'white' }}>
              GamCheckWorks
            </Typography.Text>
          </Col>
          <Col span={20} style={{ textAlign: 'right' }}>
            {wallet ? (
              <Space>
                <Typography.Text style={{ color: 'white' }}>
                  {/* {walletAddress} */}
                  {walletAddress.substr(0, 5) + '...' + walletAddress.substr(-5)}
                </Typography.Text>
                <Typography.Text style={{ color: 'gray' }}>
                  {typeof balance === "number"
                    ? `${(balance / LAMPORTS_PER_SOL).toLocaleString()} SOL`
                    : "--"}
                </Typography.Text>
                <Typography.Text style={{ color: 'white' }}>
                  {typeof tokenBalance === "number"
                    ? `${(tokenBalance).toLocaleString()} GCW`
                    : "--"}
                </Typography.Text>
                <Button type="primary" onClick={disconnect}>
                  Disconnect
                </Button>
              </Space>
            ) : (
              <Button type="primary" onClick={connect}>
                Connect Wallet
              </Button>
            )}
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: 40 }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col flex="auto">
                <Typography.Title>List of Candidates</Typography.Title>
              </Col>
              <Col>
                {hasProfile && (<EditProfile currentFullName={fullName} currentEmailAddress={emailAddress} currentBirthday={birthday} />)}
                {!hasProfile && (<CreateProfile />)}
              </Col>
            </Row>
          </Col>
          {/* <Col span={24}>
            <ListCandidates />
          </Col> */}
        </Row>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Typography.Link href="https://web3vn.solana.com/" target="_blank">
          Solana - Vietnam Web3 Coding Camp - 2022
        </Typography.Link>
      </Layout.Footer>
    </Layout >
  )
}

export default App
