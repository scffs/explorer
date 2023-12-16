import { IReturnSystem } from '@types'
import { Icon56ComputerOutline } from '@vkontakte/icons'
import { Avatar, Gradient, Text, Title } from '@vkontakte/vkui'
import { FC } from 'preact/compat'

const styles = {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: 32
}

interface ComputerInfoProps {
  system: IReturnSystem
}

export const ComputerInfo: FC<ComputerInfoProps> = ({ system }) => {
  return (
    <Gradient mode='tint' to='top' style={styles}>
      {/*// @ts-ignore*/}
      <Avatar size={96}>
        <Icon56ComputerOutline width={70} height={70} />
      </Avatar>
      {/*// @ts-ignore*/}
      <Title style={{ marginBottom: 8, marginTop: 20 }} level='2' weight='2'>
        {system.host_name}
      </Title>
      {/*// @ts-ignore*/}
      <Text
        style={{
          color: 'var(--vkui--color_text_secondary)'
        }}
      >
        {system.name} {system.os_version}
      </Text>
    </Gradient>
  )
}
