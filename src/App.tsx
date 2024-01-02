import {
  useActiveVkuiLocation,
  useGetPanelForView
} from '@vkontakte/vk-mini-apps-router'
import {
  AppRoot,
  Panel,
  PanelHeader,
  Root as VKUIRoot,
  SplitCol,
  SplitLayout,
  View
} from '@vkontakte/vkui'
import { routes } from './routes'
import Directory from './views/Directory.tsx'
import Root from './views/Root.tsx'

function App() {
  const { view = routes.default_root.default_view.id } = useActiveVkuiLocation()
  const activePanel = useGetPanelForView('default_view') ?? ''

  return (
    // @ts-ignore
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol autoSpaced>
          <VKUIRoot activeView={view} id={routes.default_root.id}>
            <View nav='default_view' activePanel={activePanel}>
              <Panel id={routes.default_root.default_view.home_panel.id}>
                <Root />
              </Panel>
              <Panel id={routes.default_root.default_view.directory_panel.id}>
                <Directory />
              </Panel>
            </View>
          </VKUIRoot>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
}

export default App
