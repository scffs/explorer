import { openDirectory } from '@utils'
import { setData } from '../store'

export const useEntityClick = async (path: string) => {
  console.log('useEntityClick', path)
  const data = await openDirectory(path)
  console.log(data)
  setData(data, path)

  return data
}
