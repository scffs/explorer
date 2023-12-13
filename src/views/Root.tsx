import { invoke } from '@tauri-apps/api/tauri'
import { Icon56ComputerOutline, Icon56FolderOutline } from '@vkontakte/icons'
import {
  Avatar,
  Div,
  Gradient,
  Group,
  Header,
  Panel,
  PanelHeader,
  Progress,
  SimpleCell,
  Text,
  Title,
  View
} from '@vkontakte/vkui'
import { FC, useEffect } from 'preact/compat'
import { useState } from 'preact/hooks'

const styles = {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: 32
}

const getAppearance = (value: number): 'positive' | 'accent' | 'negative' => {
  switch (true) {
    case value > 60:
      return 'positive'
    case value > 30:
      return 'accent'
    default:
      return 'negative'
  }
}

const Root: FC = () => {
  const [diskInfo, setDiskInfo] = useState<SystemInfo>({
    system: {
      name: null,
      kernel_version: null,
      os_version: null,
      host_name: null
    },
    disks: []
  })

  useEffect(() => {
    async function getDiskInfo() {
      const data: SystemInfo = await invoke('get_disk_info')
      setDiskInfo(data)
    }

    getDiskInfo()
  }, [])
  return (
    <View activePanel='main'>
      <Panel id='main'>
        <PanelHeader>Проводник</PanelHeader>
        <Group>
          <Gradient mode='tint' to='top' style={styles}>
            {/*// @ts-ignore*/}
            <Avatar size={96}>
              <Icon56ComputerOutline width={70} height={70} />
            </Avatar>
            {/*// @ts-ignore*/}
            <Title
              style={{ marginBottom: 8, marginTop: 20 }}
              level='2'
              weight='2'
            >
              {diskInfo.system.host_name}
            </Title>
            {/*// @ts-ignore*/}
            <Text
              style={{
                color: 'var(--vkui--color_text_secondary)'
              }}
            >
              {diskInfo.system.name} {diskInfo.system.os_version}
            </Text>
          </Gradient>
          <Group mode='plain' header={<Header>Диски и другие носители</Header>}>
            {diskInfo.disks.map((disk) => (
              <Div
                key={
                  disk.percent_free + disk.total_space + disk.available_space
                }
              >
                <SimpleCell
                  before={<Icon56FolderOutline width={40} height={40} />}
                  after={!disk.is_removable && 'Не съёмный'}
                  subtitle={`Свободно ${disk.formatted_available_space} из ${disk.formatted_total_space}`}
                >
                  {disk.mount_point}
                </SimpleCell>
                <Div>
                  <Progress
                    appearance={getAppearance(disk.percent_free)}
                    aria-labelledby='progresslabelPositive'
                    value={disk.percent_free}
                    height={5}
                  />
                </Div>
              </Div>
            ))}
          </Group>
        </Group>
      </Panel>
    </View>
  )
}

export default Root
