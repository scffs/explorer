import { IDisk } from '@types'
import { getProgressAppearance } from '@utils'
import { Icon56FolderOutline } from '@vkontakte/icons'
import { Div, Progress, SimpleCell } from '@vkontakte/vkui'
import { FC, HTMLProps } from 'preact/compat'

interface DiskProps extends HTMLProps<HTMLDivElement> {
  disk: IDisk
}

export const Disk: FC<DiskProps> = ({ disk, ...props }) => {
  return (
    <Div
      {...props}
      key={disk.percent_free + disk.total_space + disk.available_space}
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
          appearance={getProgressAppearance(disk.percent_free)}
          aria-labelledby='progresslabelPositive'
          value={disk.percent_free}
          height={5}
        />
      </Div>
    </Div>
  )
}
