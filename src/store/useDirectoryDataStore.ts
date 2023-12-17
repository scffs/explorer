// FIXME
// @ts-nocheck из-за persist почему-то ошибка типов
import { DirectoryChild } from '@types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  data: DirectoryChild[]
}

export const useDirectoryDataStore = create<State>()(
  persist(
    () => ({
      data: []
    }),
    {
      name: 'directory-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export const getData = () => useDirectoryDataStore.getState()
export const setData = (data: DirectoryChild[]) =>
  useDirectoryDataStore.setState({ data })
