// FIXME
// @ts-nocheck из-за persist почему-то ошибка типов
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  data: string[]
  currentIndex: number
}

export const useHistoryStore = create<State>()(
  persist(
    () => ({
      data: [],
      currentIndex: -1
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export const getHistoryData = (): State => useHistoryStore.getState()

export const pushData = (newData: string): void => {
  useHistoryStore.setState((state) => ({
    data: [...state.data, newData],
    currentIndex: state.currentIndex + 1
  }))
}

export const getCurrentEntry = (): string | null => {
  const currentIndex = getHistoryData().currentIndex
  return currentIndex >= 0 ? getHistoryData().data[currentIndex] : null
}

export const goBack = (): void => {
  useHistoryStore.setState((state) => ({
    currentIndex: Math.max(state.currentIndex - 1, -1),
    data: state.data.slice(0, -1)
  }))
}

export const canGoBack = (): boolean => getData().currentIndex > 0
