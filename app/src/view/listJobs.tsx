import { Col, Row } from 'antd'
import ProfileDetail from './jobDetail'

const ListJobs = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={8} style={{ cursor: 'pointer' }}>
        <ProfileDetail title={"Lead Software Engineer"} jd={"A US-based company that is providing remarkable post-purchase experiences to help businesses accelerate their brand’s growth, is looking for a Lead Software Engineer. The engineer will be expected to take part in the code review process with other engineers. The company is revolutionizing the e-commerce industry and transitioning it from a cost center to a growth engine. The company has managed to raise $20mn+ during their Series A round of funding. This is a full-time long-term position and requires a significant overlap with the PST/EST/CST time zone."} address="Ha Noi" type="Full-time" skills="Java Ruby Python" />
      </Col>
      <Col span={8} style={{ cursor: 'pointer' }}>
        <ProfileDetail title={"Rust Developer"} jd="A rapidly-growing company that is building sophisticated data analysis solutions that will help to revolutionize businesses across industries, is looking for a Rust Developer. The developer will be collaborating with cross-functional teams to deliver high-quality products. The company takes unorganized data and provides structured organized data to businesses to help them grow. This is an exciting opportunity for developers who enjoy working in a fast-paced environment. " address="Da Nang" type="Remote" skills="Rust Python" />
      </Col>
      <Col span={8} style={{ cursor: 'pointer' }}>
        <ProfileDetail title={"Software Engineer"} jd="A US-based company that is providing cutting-edge solutions for protecting web services from password-based attacks is looking for a Software Engineer. The engineer will be taking charge of new feature development while scaling the existing ones. The company's goal is to give people an impregnable digital identity that grants them control over their credentials and allows service providers to utilize it with the users’ permission to combat fraud and identity theft. The company has managed to raise $12mn+ during their Series A round of funding." address="Ho Chi Minh" type="Full-time" skills="PHP Laravel" />
      </Col>
    </Row>
  )
}

export default ListJobs
