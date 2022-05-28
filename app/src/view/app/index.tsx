import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useWalletKit, useSolana, useConnectedWallet } from '@gokiprotocol/walletkit'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { web3, utils, BN } from '@project-serum/anchor'

import { Button, Col, Layout, Row, Space, Typography, Image } from 'antd'

import { setWalletInfo, WalletState } from 'store/wallet.reducer'
import { AppDispatch } from 'store'
import CreateProfile from 'view/createProfile';
import EditProfile from 'view/editProfile';
import VoteProfile from 'view/voteProfile';
import Home from 'view/home';
import ListJobs from 'view/listJobs';
import { getProgram } from '../../config'
import "../../styles/index.css";
import { Route, Switch } from 'react-router-dom';
var CryptoJS = require("crypto-js");

const mintAddress = '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA';
const passwordWillBeRandom = 'LZGqa:~u""D]Y-6(Nq+mL/DG%$Emn2}}';

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [walletAddress, setWalletAdress] = useState<string>("");
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [ipfsLink, setIpfsLink] = useState<string>("");
  const [ipfsKey, setIpfsKey] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [workingExperience, setWorkingExperience] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [checkerEmail_1, setCheckerEmail_1] = useState('')
  const [checkerEmail_2, setCheckerEmail_2] = useState('')
  const [checkerEmail_3, setCheckerEmail_3] = useState('')
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
    console.log('===profilePDA===', profilePDA.toBase58());
    setProfilePDA(profilePDA.toBase58());
    try {
      let profileData = await program.account.profile.fetch(profilePDA);
      console.log("**profileData**", profileData);

      setFullName(profileData.fullName);
      setEmailAddress(profileData.email);
      setBirthday(Number(profileData.birthday));
      setIpfsLink(profileData.ipfsLink);
      setIpfsKey(profileData.ipfsKey);
      setHasProfile(true)
      console.log('ipfslink  index.tsx', profileData.ipfsLink);
      const response = await fetch('https://ipfs.io/ipfs/' + profileData.ipfsLink);
      const responseJSON = await response.json();
      console.log(responseJSON);
      setPhoneNumber(CryptoJS.AES.decrypt(responseJSON['Phone Number '], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setSkills(CryptoJS.AES.decrypt(responseJSON['Skills'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setWorkingExperience(CryptoJS.AES.decrypt(responseJSON['Working Experience'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setEducation(CryptoJS.AES.decrypt(responseJSON['Education'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setCheckerEmail_1(CryptoJS.AES.decrypt(responseJSON['Checker email 1'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setCheckerEmail_2(CryptoJS.AES.decrypt(responseJSON['Checker email 2'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));
      setCheckerEmail_3(CryptoJS.AES.decrypt(responseJSON['Checker email 3'], passwordWillBeRandom).toString(CryptoJS.enc.Utf8));

    } catch (error) {
      setHasProfile(false)
    }
  }, [providerMut, wallet])

  useEffect(() => {
    fetchWalletInfo()
  }, [fetchWalletInfo])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <Row justify="end">
          <Col span={4}>
            <Typography.Text style={{ color: '#08626f', fontSize: '32px', fontWeight: 'bolder' }}>
              G
            </Typography.Text>
            <Typography.Text style={{ color: '#08626f', fontSize: '28px', fontWeight: 'bolder' }}>
              am
            </Typography.Text>
            <Typography.Text style={{ color: '#08626f', fontSize: '32px', fontWeight: 'bolder' }}>
              C
            </Typography.Text>
            <Typography.Text style={{ color: '#08626f', fontSize: '28px', fontWeight: 'bolder' }}>
              heck
            </Typography.Text>
            <Typography.Text style={{ color: '#08626f', fontSize: '32px', fontWeight: 'bolder' }}>
              W
            </Typography.Text>
            <Typography.Text style={{ color: '#08626f', fontSize: '28px', fontWeight: 'bolder' }}>
              orks
            </Typography.Text>
          </Col>
          <Col span={20} style={{ textAlign: 'right' }}>
            {wallet ? (
              <Space>
                <Typography.Text style={{ color: 'gray', fontWeight: 'bold', padding: '6px 12px', borderRadius: '9999px', border: '1px solid' }}>
                  {/* {walletAddress} */}
                  {walletAddress.substr(0, 6) + '...' + walletAddress.substr(-6)}
                </Typography.Text>
                <Typography.Text style={{ color: 'gray', padding: '6px 12px', borderRadius: '9999px', border: '1px solid' }}>
                  {typeof balance === "number"
                    ? `${(balance / LAMPORTS_PER_SOL).toLocaleString()} SOL`
                    : "--"}
                </Typography.Text>
                <Typography.Text style={{ color: '#fff', fontWeight: 'bold', padding: '6px 12px', borderRadius: '9999px', background: '#08626f' }}>
                  {typeof tokenBalance === "number"
                    ? `${(tokenBalance).toLocaleString()} GCW`
                    : "--"}
                </Typography.Text>
                <Button className="mydialogbutton" onClick={disconnect}>
                  Disconnect
                </Button>
              </Space>
            ) : (
              <Button className="mydialogbutton" onClick={connect}>
                Connect Wallet
              </Button>
            )}
          </Col>
        </Row>
      </Layout.Header>

      <Layout.Content style={{ padding: 40 }}>
        <Switch>
          <Route path="/vote" component={VoteProfile} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Typography.Text style={{ color: '#fff' }}>
          Tuan Vu @ &nbsp;
        </Typography.Text>

        <Typography.Link href="https://web3vn.solana.com/" target="_blank" className='footerlink'>
          Solana - Vietnam Web3 Coding Camp - 2022
        </Typography.Link>
      </Layout.Footer>
    </Layout >
  )
}

export default App
