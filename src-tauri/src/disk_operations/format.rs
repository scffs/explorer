use crate::disk_operations::structs::SystemInfo;
use std::cmp;

/// # format_bytes
/// Функция преобразует количество байт в читаемый формат.
///
/// # Аргументы
///
/// * `bytes` - количество байт для преобразования.
/// * `decimals` - количество десятичных знаков для отображения.
///
/// # Возвращаемое значение
///
/// Возвращает строку с читаемым форматом.
pub(crate) fn format_bytes(bytes: u64, decimals: usize) -> String {
  if bytes == 0 {
    return String::from("0 Bytes");
  }

  let k: u64 = 1024;
  let dm: i32 = cmp::max(0, decimals as i32);
  let sizes: [&str; 9] = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = (bytes as f64).log(k as f64).floor() as usize;

  format!(
    "{:.width$} {}",
    bytes as f64 / k.pow(i as u32) as f64,
    sizes[i],
    width = dm as usize
  )
}

/// # convert_to_readable_format
/// Принимает SystemInfo и вызывает для каждого диска format_bytes()
/// # Аргументы
///
/// * `system_info` - Структура SystemInfo, содержащая информацию о системе и дисках.
pub(crate) fn convert_to_readable_format(system_info: &mut SystemInfo) {
  for disk in &mut system_info.disks {
    disk.formatted_available_space = Some(format_bytes(disk.available_space, 2));
    disk.formatted_total_space = Some(format_bytes(disk.total_space, 2));
  }
}
