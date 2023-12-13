import { AppRoot, PanelHeader, SplitCol, SplitLayout } from '@vkontakte/vkui'
import Root from './views/Root.tsx'

function App() {
  return (
    // @ts-expect-error React types
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol autoSpaced>
          <Root />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
}

export default App
