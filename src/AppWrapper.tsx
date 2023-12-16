import { RouterProvider } from '@vkontakte/vk-mini-apps-router'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/cssm/styles/themes.css'
import App from './App.tsx'
import { router } from './routes'
const AppWrapper = () => (
  <ConfigProvider>
    <AdaptivityProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AdaptivityProvider>
  </ConfigProvider>
)
export default AppWrapper
