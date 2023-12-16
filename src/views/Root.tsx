import { ComputerInfo, Disk } from '@components'
import { useEntityClick, useSpinner } from '@hooks'
import { ISystemInfo } from '@types'
import { getSystemInfo } from '@utils'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Group, Header, PanelHeader } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'preact/compat'
import { routes } from '../routes'

const initial = {
  system: {
    name: null,
    kernel_version: null,
    os_version: null,
    host_name: null
  },
  disks: []
}

const Root: FC = () => {
  const navigator = useRouteNavigator()

  const [systemInfo, setSystemInfo] = useState<ISystemInfo>(initial)

  useEffect(() => {
    getSystemInfo().then((data) => {
      setSystemInfo(data)
    })
  }, [])

  const { system, disks } = systemInfo

  if (!system.name) return useSpinner()

  const handleDiskClick = async (path: string) => {
    await useEntityClick(path)
    await navigator.push(routes.default_root.default_view.directory_panel)
  }

  return (
    <>
      <PanelHeader>Проводник</PanelHeader>
      <ComputerInfo system={system} />
      <Group>
        <Group mode='plain' header={<Header>Диски и другие носители</Header>}>
          {disks.map((disk) => (
            <Disk
              disk={disk}
              onClick={() => handleDiskClick(disk.mount_point)}
            />
          ))}
        </Group>
      </Group>
    </>
  )
}

export default Root
