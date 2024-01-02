import { openDirectory } from '@utils'
import { setData } from '../store'
import { pushData } from '../store/useHistoryStore.ts'

export const useEntityClick = async (path: string) => {
  pushData(path)
  const data = await openDirectory(path)
  setData(data)

  return data
}
