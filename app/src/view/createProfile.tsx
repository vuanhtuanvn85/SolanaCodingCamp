import { UserAddOutlined } from '@ant-design/icons'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { BN, utils, web3 } from '@project-serum/anchor'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Typography } from 'antd'
import moment from 'moment'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProfile } from 'store/profiles.reducer'
import { getProgram } from '../config'

const mintAddress = '5ftoDyQvRRL9wFXmaHVN4vYqfdjWue8woQSQ1T8RpinA';

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
  const dispatch = useDispatch()
  const wallet = useConnectedWallet()

  const onCreateProfile = async () => {
    if (!wallet || !emailAddress || !birthday || !phoneNumber) return
    console.log(wallet, emailAddress, birthday, phoneNumber)

    const program = getProgram(wallet)

    const profile = new web3.Keypair()
    let treasurer: web3.PublicKey

    const [treasurerPublicKey] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('treasurer'), profile.publicKey.toBuffer()],
      program.programId,
    )
    console.log({ program });
    console.log(program.programId.toBase58());
    treasurer = treasurerPublicKey

    let profileTokenAccount = await utils.token.associatedAddress({
      mint: new web3.PublicKey(mintAddress),
      owner: treasurerPublicKey,
    })

    try {
      setLoading(true)
      const tx = await program.rpc.initializeProfile(fullName, new BN(birthday.valueOf() / 1000), emailAddress, "", "", {
        accounts: {
          authority: wallet.publicKey,
          profile: profile.publicKey,
          treasurer,
          mint: new web3.PublicKey(mintAddress),
          profileTokenAccount,
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [profile],
      })
      console.log(tx);

      dispatch(
        setProfile({
          full_name: fullName,
          birthday: birthday.valueOf() / 1000,
          email: emailAddress,
          is_email_verified: false,
          ipfs_link: "",
          ipfs_key: "",
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
      <Button icon={<UserAddOutlined />} onClick={() => setVisible(true)} block loading={loading}>
        New Profile
      </Button>
      <Modal
        title={<Typography.Title level={4}>New Profile</Typography.Title>}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose={false}
        centered={true}
        width={1000}
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
                <Input.TextArea allowClear showCount rows={5} />
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
                <Input.TextArea allowClear showCount rows={5} />
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
                <Input.TextArea allowClear showCount rows={5} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" onClick={onCreateProfile} block>
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
