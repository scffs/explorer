import {
  RoutesConfig,
  createHashRouter,
  createPanel,
  createRoot,
  createView
} from '@vkontakte/vk-mini-apps-router'

export const routes = RoutesConfig.create([
  createRoot('default_root', [
    createView('default_view', [
      createPanel('home_panel', '/'),
      createPanel('directory_panel', '/directory')
    ])
  ])
])

export const router = createHashRouter(routes.getRoutes())
