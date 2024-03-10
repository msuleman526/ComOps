import { Layout } from 'antd'
import React from 'react'

const LayoutContent = ({ children }) => {
  return (
    <Layout.Content
      style={{
        minHeight: 280,
      }}
    >
      {children}
    </Layout.Content>
  )
}

export default LayoutContent
