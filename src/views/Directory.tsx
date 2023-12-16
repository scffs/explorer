import { useEntityClick } from '@hooks'
import { Icon20FolderOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Group, Header, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import { useEffect } from 'preact/compat'
import { routes } from '../routes'
import { getData, setBefore, setData } from '../store'

const Directory = () => {
  const navigator = useRouteNavigator()
  const { data, before } = getData()

  const handleClick = async (path: string) => {
    await useEntityClick(path)
    setBefore(path)
    await navigator.push(routes.default_root.default_view.directory_panel)
  }

  useEffect(() => {
    const handlePopstate = async () => {
      if (!before) {
        return
      }

      const pathParts = before.split('\\')
      console.log('parts', pathParts)
      pathParts.pop()
      const newPath = pathParts.join('\\')
      console.log('new', newPath)
      setBefore(newPath)
      const data = await useEntityClick(newPath)
      console.log(data, 'data')
      setData(data, newPath)
    }

    window.addEventListener('popstate', handlePopstate)

    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])

  console.log('before', before)

  return (
    <>
      <PanelHeader>Директория {before}</PanelHeader>
      <Group header={<Header mode='secondary'>AA</Header>}>
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
