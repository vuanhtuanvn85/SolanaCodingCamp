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
import "../../styles/index.css";
var CryptoJS = require("crypto-js");

const mintAddress = '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA';
const passwordWillBeRandom = 'LZGqa:~u""D]Y-6(Nq+mL/DG%$Emn2}}';

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [walletAddress, setWalletAdress] = useState<string>("");
  const [hasProfile, setHasProfile] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [ipfsLink, setIpfsLink] = useState<string>("");
  const [ipfsKey, setIpfsKey] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [workingExperience, setWorkingExperience] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [profilePDA, setProfilePDA] = useState<string>("");
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

    let walletInfo: WalletState = {
      walletAddress: wallet.publicKey.toBase58(),
      balance: lamports,
      tokenBalance: tokenBalanceInfo.value.uiAmount ? tokenBalanceInfo.value.uiAmount : 0,
    }
    dispatch(setWalletInfo(walletInfo))
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
    console.log('===profilePDA', profilePDA.toBase58());
    setProfilePDA(profilePDA.toBase58());
    try {
      let profileData = await program.account.profile.fetch(profilePDA);
      console.log("profileData", profileData);
      setFullName(profileData.fullName);
      setEmailAddress(profileData.email);
      setBirthday(Number(profileData.birthday));
      setIpfsLink(profileData.ipfsLink);
      setIpfsKey(profileData.ipfsKey);

      console.log('ipfslink  index.tsx', profileData.ipfsLink);
      const response = await fetch('https://ipfs.io/ipfs/' + profileData.ipfsLink);
      const responseJSON = await response.json();
      setPhoneNumber(CryptoJS.AES.decrypt(responseJSON['Phone Number '], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setSkills(CryptoJS.AES.decrypt(responseJSON['Skills'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setWorkingExperience(CryptoJS.AES.decrypt(responseJSON['Working Experience'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setEducation(CryptoJS.AES.decrypt(responseJSON['Education'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));

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
                <Typography.Title>List of Profiles</Typography.Title>
              </Col>
              <Col>
                {hasProfile && (<EditProfile currentFullName={fullName} currentEmailAddress={emailAddress} currentBirthday={birthday} currentIpfsLink={ipfsLink} currentPhoneNumber={phoneNumber} currentSkills={skills} currentWorkingExperience={workingExperience} currentEducation={education} profilePDA={profilePDA} />)}
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
