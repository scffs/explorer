interface Disk {
  file_system: number[]
  mount_point: string
  available_space: number
  total_space: number
  is_removable: boolean
  percent_free: number
  formatted_available_space?: string
  formatted_total_space?: string
}

interface ReturnSystem {
  name?: string | null
  kernel_version?: string | null
  os_version?: string | null
  host_name?: string | null
}

interface SystemInfo {
  system: ReturnSystem
  disks: Disk[]
}
