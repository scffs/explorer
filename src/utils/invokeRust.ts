import { invoke } from '@tauri-apps/api/tauri'
import { DirectoryChild, ISystemInfo } from '@types'

export const getSystemInfo = async (): Promise<ISystemInfo> =>
  await invoke('get_disk_info')

export const openDirectory = async (path: string): Promise<DirectoryChild[]> =>
  await invoke('open_directory', { path })
