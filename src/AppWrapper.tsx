import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/cssm/styles/themes.css'
import App from './App.tsx'
const AppWrapper = () => (
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
)
export default AppWrapper
