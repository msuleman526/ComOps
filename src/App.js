import { ConfigProvider } from 'antd'
import GoogleMap from './Pages/GoogleMap'
import LayoutProvider from './layout/LayoutProvider'

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#fff',
            headerBg: '#fff',
            
          },
          Menu: {
            itemBg: '#fff',
            algorithm:true,
          },
        },
      }}
    >
      <LayoutProvider>
        <GoogleMap />
      </LayoutProvider>
    </ConfigProvider>
  )
}

export default App
