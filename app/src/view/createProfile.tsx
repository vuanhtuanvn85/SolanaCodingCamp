import { UserAddOutlined } from '@ant-design/icons'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { BN, utils, web3 } from '@project-serum/anchor'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Typography, Image } from 'antd'
import moment from 'moment'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProfile } from 'store/profiles.reducer'
import { getProgram } from '../config'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client"
var CryptoJS = require("crypto-js");

const mintAddress = '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA';
const passwordWillBeRandom = 'LZGqa:~u""D]Y-6(Nq+mL/DG%$Emn2}}';

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="84">+84</Select.Option>
    </Select>
  </Form.Item>
);

const config = {
  rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateProfile = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthday, setBirthday] = useState<moment.Moment>()
  const [skills, setSkills] = useState('')
  const [workingExperience, setWorkingExperience] = useState('')
  const [education, setEducation] = useState('')
  const dispatch = useDispatch()
  const wallet = useConnectedWallet()

  const onCreateProfile = async () => {
    console.log("========CREATE PROFILE ==========");
    let ipfs: IPFSHTTPClient | undefined;
    try {
      ipfs = create({
        url: "https://ipfs.infura.io:5001/api/v0",

      });
    } catch (error) {
      console.error("IPFS error ", error);
      ipfs = undefined;
    }

    if (!wallet || !fullName || !emailAddress || !birthday || !ipfs) return
    // console.log(wallet, fullName, emailAddress, birthday, phoneNumber)

    const program = getProgram(wallet)

    const [profilePDA, _] = await web3.PublicKey
      .findProgramAddress(
        [
          utils.bytes.utf8.encode("profile"),
          wallet.publicKey.toBuffer()
        ],
        program.programId
      );
    console.log('profilePDA', profilePDA.toBase58());

    let treasurer: web3.PublicKey

    const [treasurerPublicKey] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('treasurer'), profilePDA.toBuffer()],
      program.programId,
    )
    // console.log({ program });
    // console.log(program.programId.toBase58());
    treasurer = treasurerPublicKey

    let profileTokenAccount = await utils.token.associatedAddress({
      mint: new web3.PublicKey(mintAddress),
      owner: treasurerPublicKey,
    })
    console.log('a');
    try {
      setLoading(true)
      const ipfsContent = `{"Full Name": "` + fullName + `", 
        "Birthday": "` + birthday + `", 
        "Email": "` + emailAddress + `", 
        "Phone Number ": "` + CryptoJS.AES.encrypt(phoneNumber, passwordWillBeRandom).toString() + `", 
        "Skills": "` + CryptoJS.AES.encrypt(skills, passwordWillBeRandom).toString() + `", 
        "Working Experience": "` + CryptoJS.AES.encrypt(workingExperience, passwordWillBeRandom).toString() + `", 
        "Education": "` + CryptoJS.AES.encrypt(education, passwordWillBeRandom).toString() + `"}`

      console.log(ipfsContent);
      if (!ipfs) return
      const fileAdded = await ipfs.add({ path: '', content: ipfsContent });

      const ipfsPath = fileAdded.path;
      console.log("ipfsPath", ipfsPath);
      const tx = await program.rpc.initializeProfile(fullName, new BN(birthday.valueOf() / 1000), emailAddress, ipfsPath, passwordWillBeRandom, {
        accounts: {
          authority: wallet.publicKey,
          profile: profilePDA,
          treasurer,
          mint: new web3.PublicKey(mintAddress),
          profileTokenAccount,
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [],
      })
      console.log(tx);

      dispatch(
        setProfile({
          full_name: fullName,
          birthday: birthday.valueOf() / 1000,
          email: emailAddress,
          is_email_verified: false,
          ipfs_link: ipfsPath,
          ipfs_key: passwordWillBeRandom,
        }),
      )
      setVisible(false)
      return notification.success({ message: 'Created a profile' })
    } catch (er: any) {
      return notification.error({ message: er.message })
    } finally {
      return setLoading(false)
    }
  }

  return (
    <Fragment>

      <Col span={24}>
        <Typography.Title level={1}></Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={1}></Typography.Title>
      </Col>
      <Col span={24}>
        <Image preview={false} style={{ width: "85vw", marginLeft: "60px" }} src="../..//images/createprofile.png" />
      </Col>
      <Col span={24} style={{ marginLeft: "65px" }}>
        <Button icon={<UserAddOutlined />} onClick={() => setVisible(true)} block loading={loading} className="mybutton">
          New Profile
        </Button>
      </Col>

      <Col span={24} style={{ marginLeft: "80px", marginTop: "15px" }}>
        <Typography.Text>
          Looking to hire instead?
        </Typography.Text>
        <Typography.Link href="https://web3vn.solana.com/" target="_blank" >
          Hire developers
        </Typography.Link>
      </Col>
      <Col span={24}>
        <Typography.Title level={1}></Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={1}></Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={1}></Typography.Title>
      </Col>
      <Modal
        title={<Typography.Title level={4}>New Profile</Typography.Title>}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose={false}
        centered={true}
        width={900}
      >
        <Form
          {...layout}
          initialValues={{
            prefix: '84',
          }}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Form.Item
                name="fullname"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your full name!',
                  },
                ]}
                labelAlign="left"
              >
                <Input onChange={(e) => setFullName(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="date-picker"
                label="Birthday"
                rules={[{ required: true, message: 'Please input your birthday!' }]}
                labelAlign="left"
              >
                <DatePicker onChange={(date) => setBirthday(moment(date))} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="emailaddress"
                label="Email Address"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  }
                ]}
                labelAlign="left"
              >
                <Input onChange={(e) => setEmailAddress(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="phone"
                label="Phone Number"
                labelAlign="left"
              >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} onChange={(e) => setPhoneNumber(e.target.value || '')} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="skills"
                label="Skills"
                hasFeedback
                rules={[{ required: true, message: 'Please input your skills!' }]}
                labelAlign="left"
              >
                <Input.TextArea allowClear showCount rows={5} onChange={(e) => setSkills(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="working-experience"
                label="Working Experience"
                hasFeedback
                rules={[{ required: true, message: 'Please input your working experience!' }]}
                labelAlign="left"
              >
                <Input.TextArea allowClear showCount rows={5} onChange={(e) => setWorkingExperience(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="education"
                label="Education"
                hasFeedback
                rules={[{ required: true, message: 'Please input your education!' }]}
                labelAlign="left"
              >
                <Input.TextArea allowClear showCount rows={5} onChange={(e) => setEducation(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button className="mydialogbutton" onClick={onCreateProfile} block>
                Create Profile
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default CreateProfile
