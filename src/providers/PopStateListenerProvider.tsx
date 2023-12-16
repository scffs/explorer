import { useEntityClick } from '@hooks'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { FC, useEffect } from 'preact/compat'
import { routes } from '../routes'

const removeLastPathComponent = (path: string | null) => {
  if (!path) {
    return
  }

  const pathArray = path.split(/[\\\/]/)

  pathArray.pop()
  return pathArray.join('/')
}

interface Props {
  path: string | null
}

export const PopStateListenerProvider: FC<Props> = ({ path, children }) => {
  const navigator = useRouteNavigator()

  useEffect(() => {
    const handlePopState = async (event: PopStateEvent) => {
      console.error('AAAAAA')

      if (event.state !== null) {
        console.log('window.location.pathname', path)
        const modifiedUrl = removeLastPathComponent(path)

        if (!modifiedUrl) {
          return
        }

        const data = await useEntityClick(modifiedUrl)
        console.log(data)
        await navigator.push(routes.default_root.default_view.directory_panel)

        console.log(modifiedUrl)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return <>{children}</>
}
