import React, { useState } from 'react'
import { UploadOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Flex, Image, Layout, Menu, Typography } from 'antd'
import LayoutHeader from './LayoutHeader'
import LayoutContent from './LayoutContent'
import img from '../chat-gpt.png'
import { FaHome,FaDrawPolygon ,FaCircle} from 'react-icons/fa'

const { Sider } = Layout

const LayoutProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleBreakpoint = (broken) => {
    if (broken) {
      setCollapsed(true)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} breakpoint="md" onBreakpoint={handleBreakpoint} trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <div style={{ marginBlock: '20px', paddingInline: '20px' }}>
          <Flex gap={'small'}>
            <Image width={40} height={30} src={img} alt="img" />
            <Typography.Title level={4}>CHAT GPT</Typography.Title>
          </Flex>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FaHome />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <FaDrawPolygon />,
              label: 'Polygon',
            },
            {
              key: '3',
              icon: <FaCircle />,
              label: 'Circle',
            },
          ]}
        />
      </Sider>
      <Layout>
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <LayoutContent>{children}</LayoutContent>
      </Layout>
    </Layout>
  )
}

export default LayoutProvider
