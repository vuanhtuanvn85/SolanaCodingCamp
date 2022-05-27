import { UserAddOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { BN, utils, web3 } from '@project-serum/anchor'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Space, Tooltip, Typography, Image } from 'antd'
import moment from 'moment'
import { Fragment, useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setProfile } from 'store/profiles.reducer'
import { getProgram } from '../config'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client"
var CryptoJS = require("crypto-js");
import "../styles/index.css"


const mintAddress = '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA';
const passwordWillBeRandom = 'LZGqa:~u""D]Y-6(Nq+mL/DG%$Emn2}}';

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="84">+84</Select.Option>
    </Select>
  </Form.Item>
);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface EditProfileProps {
  currentFullName: string,
  currentEmailAddress: String,
  currentBirthday: Number,
  currentIpfsLink: String,
  currentPhoneNumber: String,
  currentSkills: String,
  currentWorkingExperience: String,
  currentEducation: String,
  currentCheckerEmail_1: String,
  currentCheckerEmail_2: String,
  currentCheckerEmail_3: String,
  profilePDA: String
}

const EditProfile: React.FC<EditProfileProps> = ({ currentFullName, currentEmailAddress, currentBirthday, currentIpfsLink, currentPhoneNumber, currentSkills, currentWorkingExperience, currentEducation, profilePDA, currentCheckerEmail_1, currentCheckerEmail_2, currentCheckerEmail_3 }) => {
  console.log("====profilePDA", profilePDA);
  console.log("====currentCheckerEmail_1========", currentCheckerEmail_1);
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState(currentFullName)
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthday, setBirthday] = useState<moment.Moment>()
  const [skills, setSkills] = useState('')
  const [workingExperience, setWorkingExperience] = useState('')
  const [education, setEducation] = useState('')
  const [checkerEmail_1, setCheckerEmail_1] = useState('')
  const [checkerEmail_2, setCheckerEmail_2] = useState('')
  const [checkerEmail_3, setCheckerEmail_3] = useState('')
  const dispatch = useDispatch()
  const wallet = useConnectedWallet()

  const onUpdateProfile = async () => {
    let ipfs: IPFSHTTPClient | undefined;
    try {
      ipfs = create({
        url: "https://ipfs.infura.io:5001/api/v0",
      });
    } catch (error) {
      console.error("IPFS error ", error);
      ipfs = undefined;
    }

    if (!wallet || (fullName && !emailAddress && !birthday && !ipfs)) return

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


    let treasurer: web3.PublicKey

    const [treasurerPublicKey] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('treasurer'), profilePDA.toBuffer()],
      program.programId,
    )
    treasurer = treasurerPublicKey

    let profileTokenAccount = await utils.token.associatedAddress({
      mint: new web3.PublicKey(mintAddress),
      owner: treasurerPublicKey,
    })

    try {
      if (!birthday) return
      let newBirthday = new BN(birthday.valueOf() / 1000);




      setLoading(true)

      const ipfsContent = `{"Full Name": "` + fullName + `", 
        "Birthday": "` + birthday + `", 
        "Email": "` + emailAddress + `", 
        "Phone Number ": "` + CryptoJS.AES.encrypt(phoneNumber, passwordWillBeRandom).toString() + `", 
        "Skills": "` + CryptoJS.AES.encrypt(skills, passwordWillBeRandom).toString() + `", 
        "Working Experience": "` + CryptoJS.AES.encrypt(workingExperience, passwordWillBeRandom).toString() + `", 
        "Checker email 1": "` + CryptoJS.AES.encrypt(checkerEmail_1, passwordWillBeRandom).toString() + `", 
        "Checker email 2": "` + CryptoJS.AES.encrypt(checkerEmail_2, passwordWillBeRandom).toString() + `", 
        "Checker email 3": "` + CryptoJS.AES.encrypt(checkerEmail_3, passwordWillBeRandom).toString() + `", 
        "Education": "` + CryptoJS.AES.encrypt(education, passwordWillBeRandom).toString() + `"}`


      if (!ipfs) return
      const fileAdded = await ipfs.add({ path: '', content: ipfsContent });

      const ipfsPath = fileAdded.path;

      const tx = await program.rpc.updateProfile(fullName, new BN(birthday.valueOf() / 1000), emailAddress, ipfsPath, passwordWillBeRandom, {
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
      console.log("update txn", tx);

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
      return notification.success({ message: 'Update profile successfully' })
    } catch (er: any) {
      return notification.error({ message: er.message })
    } finally {
      return setLoading(false)
    }
  }
  let n = Number(currentBirthday) * 1000;
  let d = new Date(n);
  let iso = d.toISOString();
  let currentBirthdayMoment = moment(iso);

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
          Edit Profile
        </Button>
        <Button icon={<ShareAltOutlined />} onClick={() => {
          navigator.clipboard.writeText(location.protocol + '//' + location.host + '/vote/' + profilePDA.toString());
          notification.success({ message: 'Copied share link' })
        }} className="mybutton">
          Share Profile
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
        title={<Typography.Title level={4}>Edit Profile</Typography.Title>}
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
            prefix: '84'
          }}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Form.Item
                name="fullname"
                label="Full Name"
                initialValue={currentFullName}
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
                initialValue={currentBirthdayMoment}
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
                initialValue={currentEmailAddress}
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
              <Form.Item
                name="a"
                label=" "
              >
                <Space>

                  <Button danger>Click to verify</Button>
                  <Input placeholder="Code from your email"
                  />
                  {/* <Button style={{ border: "1px solid green", color: "green" }} ghost>
                      Verified
                    </Button> */}
                </Space>
              </Form.Item>


            </Col>
            <Col span={24}>
              <Form.Item
                name="phone"
                label="Phone Number"
                labelAlign="left"
                initialValue={currentPhoneNumber}
              >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} onChange={(e) => setPhoneNumber(e.target.value || '')} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="skills"
                label="Skills"
                hasFeedback
                initialValue={currentSkills}
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
                initialValue={currentWorkingExperience}
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
                initialValue={currentEducation}
              >
                <Input.TextArea allowClear showCount rows={5} onChange={(e) => setEducation(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="checkerEmail_1"
                label="1st checker email"
                labelAlign="left"
                initialValue={currentCheckerEmail_1}
              >
                <Input allowClear onChange={(e) => setCheckerEmail_1(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="checkerEmail_2"
                label="2nd checker email"
                labelAlign="left"
                initialValue={currentCheckerEmail_2}
              >
                <Input allowClear onChange={(e) => setCheckerEmail_2(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="checkerEmail_3"
                label="3rd checker email"
                labelAlign="left"
                initialValue={currentCheckerEmail_3}
              >
                <Input allowClear onChange={(e) => setCheckerEmail_3(e.target.value || '')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button className="mydialogbutton" onClick={onUpdateProfile} block>
                Update Profile
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default EditProfile
