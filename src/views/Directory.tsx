import { useEntityClick } from '@hooks'
import { Icon20FolderOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Button, Group, Header, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import { routes } from '../routes'
import { getData } from '../store'
import {
  getCurrentEntry,
  getHistoryData,
  goBack
} from '../store/useHistoryStore.ts'

const Directory = () => {
  const navigator = useRouteNavigator()
  const { data } = getData()

  async function handleClick(filePath: string) {
    console.log(filePath)
    const data = await useEntityClick(filePath)
    console.log(data)
    await navigator.push(routes.default_root.default_view.directory_panel)
  }

  const handlePopstate = async () => {
    console.log('popstate')
    const currentIndex = getHistoryData().currentIndex
    if (currentIndex > 0) {
      goBack()
      await navigator.back()
      const currDir = getCurrentEntry()
      console.log(currDir)
      const data = await useEntityClick(currDir ?? '')
      console.log('POP DATA', data)
    }
  }

  return (
    <>
      <PanelHeader>Директория</PanelHeader>
      <Group header={<Header mode='secondary'>AA</Header>}>
        <Button onClick={handlePopstate}>НАЗАД</Button>
        {data.map((item) => (
          <SimpleCell
            onClick={() => handleClick(item.path)}
            before={<Icon20FolderOutline />}
          >
            {item.name}
          </SimpleCell>
        ))}
      </Group>
    </>
  )
}

export default Directory
