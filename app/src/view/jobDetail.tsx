import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { BankOutlined, ToolOutlined } from '@ant-design/icons';

const DATE_FORMAT = 'DD/MM/YYYY hh:mm:ss'

const ProfileDetail = ({ title, jd, address, type, skills }: { title: string, jd: string, address: string, type: string, skills: string }) => {

  return (
    <Card style={{
      borderBottom: '5px solid orange'
    }} hoverable>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Space>
            <Typography.Text style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{title}</Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Text>{jd.substring(0, 250) + '...'}</Typography.Text>
          </Space>
        </Col>
        <Col span={8}>
          <Space direction="vertical">
            <Space>
              <Typography.Text>
                <ToolOutlined />{skills}
              </Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col span={8}>
          <Space direction="vertical">
            <Space>
              {address && <BankOutlined />}
              <Typography.Text>
                {address}
              </Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Space direction="vertical">
            <Space>
              <Typography.Text style={{ border: '1px solid lightgray', padding: '2px 10px', borderRadius: '99px' }}>
                {type}
              </Typography.Text>
            </Space>
          </Space>
        </Col>
      </Row>
    </Card >
  )
}

export default ProfileDetail
