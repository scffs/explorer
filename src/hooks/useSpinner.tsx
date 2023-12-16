import { Div, ScreenSpinner } from '@vkontakte/vkui'
import { useMemo } from 'preact/compat'

export const useSpinner = () =>
  useMemo(
    () => (
      <Div>
        <ScreenSpinner />
      </Div>
    ),
    []
  )
