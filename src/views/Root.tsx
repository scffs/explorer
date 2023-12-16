import { ComputerInfo, Disk } from '@components'
import { useSpinner } from '@hooks'
import { ISystemInfo } from '@types'
import { getSystemInfo, openDirectory } from '@utils'
import { Group, Header, Panel, PanelHeader, View } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'preact/compat'

const Root: FC = () => {
  const [systemInfo, setSystemInfo] = useState<ISystemInfo>({
    system: {
      name: null,
      kernel_version: null,
      os_version: null,
      host_name: null
    },
    disks: []
  })

  useEffect(() => {
    getSystemInfo().then((data) => {
      console.log(data)
      setSystemInfo(data)
    })
  }, [])

  const { system, disks } = systemInfo

  if (!system.name) return useSpinner()

  const handleDiskClick = async (path: string) => {
    const data = await openDirectory(path)
    console.log(data)
  }

  return (
    <View activePanel='main'>
      <Panel id='main'>
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
      </Panel>
    </View>
  )
}

export default Root
