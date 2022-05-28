import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useWalletKit, useSolana, useConnectedWallet } from '@gokiprotocol/walletkit'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { web3, utils, BN } from '@project-serum/anchor'

import { Button, Col, Layout, Row, Space, Typography, Image } from 'antd'

import { setWalletInfo, WalletState } from 'store/wallet.reducer'
import { AppDispatch } from 'store'
import CreateProfile from './createProfile';
import EditProfile from './editProfile';
import VoteProfile from './voteProfile';
import ListJobs from 'view/listJobs';
import { getProgram } from '../config'
import "../styles/index.css";
import { Route, Switch } from 'react-router-dom';
var CryptoJS = require("crypto-js");

const mintAddress = '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA';
const passwordWillBeRandom = 'LZGqa:~u""D]Y-6(Nq+mL/DG%$Emn2}}';

const Home = () => {

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


  }, [providerMut, wallet])

  useEffect(() => {
    fetchWalletInfo()
  }, [fetchWalletInfo])

  return (
    <Layout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col>
              {hasProfile && (<EditProfile currentFullName={fullName} currentEmailAddress={emailAddress} currentBirthday={birthday} currentIpfsLink={ipfsLink} currentPhoneNumber={phoneNumber} currentSkills={skills} currentWorkingExperience={workingExperience} currentEducation={education} profilePDA={profilePDA} currentCheckerEmail_1={checkerEmail_1} currentCheckerEmail_2={checkerEmail_2} currentCheckerEmail_3={checkerEmail_3} />)}
              {!hasProfile && (<CreateProfile />)}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col flex="auto">
              <Typography.Title level={3}>Explore developer jobs</Typography.Title>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <ListJobs />
        </Col>
        <Col span={24}>
          <Typography.Title level={4}></Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Based on your skills</Typography.Title>
        </Col>
        <Col span={24}>
          <Image preview={false} style={{ width: "85vw", marginLeft: "75px" }} src="../../images/base_on_skill.png" />
        </Col>
        <Col span={24}>
          <Typography.Title level={4}></Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}></Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Based on your role</Typography.Title>
        </Col>
        <Col span={24}>
          <Image preview={false} style={{ width: "85vw", marginLeft: "75px" }} src="../../images/base_on_role.png" />
        </Col>
      </Row>

      <Col span={24}>
        <Typography.Title level={4}></Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={4}></Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={4}></Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={4}></Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={4}></Typography.Title>
      </Col>

      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col>
            {hasProfile && (<EditProfile currentFullName={fullName} currentEmailAddress={emailAddress} currentBirthday={birthday} currentIpfsLink={ipfsLink} currentPhoneNumber={phoneNumber} currentSkills={skills} currentWorkingExperience={workingExperience} currentEducation={education} profilePDA={profilePDA} currentCheckerEmail_1={checkerEmail_1} currentCheckerEmail_2={checkerEmail_2} currentCheckerEmail_3={checkerEmail_3} />)}
            {!hasProfile && (<CreateProfile />)}
          </Col>
        </Row>
      </Col>
    </Layout >
  )
}

export default Home
