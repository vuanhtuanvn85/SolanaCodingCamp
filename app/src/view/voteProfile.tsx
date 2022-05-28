import { UserAddOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { BN, utils, web3 } from '@project-serum/anchor'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Space, Tooltip, Typography, Image } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
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

const VoteProfile: React.FC<EditProfileProps> = ({ currentFullName, currentEmailAddress, currentBirthday, currentIpfsLink, currentPhoneNumber, currentSkills, currentWorkingExperience, currentEducation, profilePDA, currentCheckerEmail_1, currentCheckerEmail_2, currentCheckerEmail_3 }) => {

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthday, setBirthday] = useState<moment.Moment>()
  const [skills, setSkills] = useState('')
  const [workingExperience, setWorkingExperience] = useState('')
  const [education, setEducation] = useState('')
  const [checkerEmail_1, setCheckerEmail_1] = useState('')
  const [checkerEmail_2, setCheckerEmail_2] = useState('')
  const [checkerEmail_3, setCheckerEmail_3] = useState('')


  const onVoteYes = async () => {

  }
  const onVoteNo = async () => {

  }

  return (
    <Fragment>
      <Row>
        <Col span={11}>
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
                  initialValue={"Tuan Vu Anh"}
                >
                  <Input readOnly onChange={(e) => setFullName(e.target.value || '')} />
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
                  initialValue={"tuanvuanh@gmail.com"}
                >
                  <Input readOnly onChange={(e) => setEmailAddress(e.target.value || '')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  labelAlign="left"
                  initialValue={"222222"}
                >
                  <Input readOnly addonBefore={prefixSelector} style={{ width: '100%' }} onChange={(e) => setPhoneNumber(e.target.value || '')} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="skills"
                  label="Skills"
                  hasFeedback
                  rules={[{ required: true, message: 'Please input your skills!' }]}
                  labelAlign="left"
                  initialValue={"blockchain, C++, Rust, PHP"}
                >
                  <Input.TextArea readOnly allowClear showCount rows={5} onChange={(e) => setSkills(e.target.value || '')} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={2}>

        </Col>
        <Col span={11}>
          <Form
            {...layout}
            initialValues={{
              prefix: '84',
            }}
          >
            <Row gutter={[12, 12]}>

              <Col span={24}>
                <Form.Item
                  name="working-experience"
                  label="Working Exp"
                  hasFeedback
                  rules={[{ required: true, message: 'Please input your working experience!' }]}
                  labelAlign="left"
                  initialValue={"Software developer 10 years, Blockchain 1 year"}
                >
                  <Input.TextArea readOnly allowClear showCount rows={5} onChange={(e) => setWorkingExperience(e.target.value || '')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="education"
                  label="Education"
                  hasFeedback
                  rules={[{ required: true, message: 'Please input your education!' }]}
                  labelAlign="left"
                  initialValue={"HCM University of Science, Self study solana"}
                >
                  <Input.TextArea readOnly allowClear showCount rows={5} onChange={(e) => setEducation(e.target.value || '')} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="">
                  <span className="ant-form-text rehire">Would you recommend for hire/rehire?</span>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button icon={<CheckOutlined />} className="btnyes" onClick={onVoteYes} block>
                  Yes
                </Button>
              </Col>
              <Col span={6}>
                <Button icon={<CloseOutlined />} className="btnno" onClick={onVoteNo} block>
                  No
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

    </Fragment>
  )
}

export default VoteProfile
