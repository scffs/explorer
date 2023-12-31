export interface IDisk {
  file_system: number[]
  mount_point: string
  available_space: number
  total_space: number
  is_removable: boolean
  percent_free: number
  formatted_available_space?: string
  formatted_total_space?: string
}

export interface IReturnSystem {
  name?: string | null
  kernel_version?: string | null
  os_version?: string | null
  host_name?: string | null
}

export interface ISystemInfo {
  system: IReturnSystem
  disks: IDisk[]
}

export type DirectoryEntityType = 'File' | 'Directory'

export interface DirectoryChild {
  type: DirectoryEntityType
  name: string
  path: string
}
