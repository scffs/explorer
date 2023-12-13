use crate::disk_operations::format::convert_to_readable_format;
use crate::disk_operations::structs::{Disk, ReturnSystem, SystemInfo};
use sysinfo::{DiskExt, System, SystemExt};

/// # get_disk_info
/// Получает информацию о дисках и возвращает структуру SystemInfo,
/// содержащую общую информацию о системе и дисках с отформатированным размером
/// доступного пространства.
///
/// # Возвращаемое значение
///
/// Возвращает структуру SystemInfo.
#[tauri::command]
pub fn get_disk_info() -> SystemInfo {
  let system = System::new_all();
  let mut disks = vec![];

  let data = ReturnSystem {
    host_name: system.host_name(),
    kernel_version: system.kernel_version(),
    name: system.name(),
    os_version: system.os_version(),
  };

  for disk in system.disks() {
    let total_space = disk.total_space();
    let available_space = disk.available_space();

    let percent_free = (available_space as f64 / total_space as f64) * 100.0;

    disks.push(Disk {
      available_space,
      total_space,
      percent_free,
      file_system: disk.file_system().to_vec(),
      is_removable: disk.is_removable(),
      mount_point: disk.mount_point().to_path_buf(),
      formatted_available_space: None,
      formatted_total_space: None,
    });
  }

  let mut system_info = SystemInfo {
    system: data,
    disks,
  };

  convert_to_readable_format(&mut system_info);

  system_info
}
