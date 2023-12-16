// FIXME
// @ts-nocheck из-за persist почему-то ошибка типов
import { DirectoryChild } from '@types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  data: DirectoryChild[]
  before: string | null
}

export const useDirectoryDataStore = create<State>()(
  persist(
    () => ({
      data: [],
      before: null
    }),
    {
      name: 'directory-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export const getData = () => useDirectoryDataStore.getState()
export const setData = (data: DirectoryChild[], before: string) =>
  useDirectoryDataStore.setState({ data, before })
export const setBefore = (before: string) =>
  useDirectoryDataStore.setState({ before })
