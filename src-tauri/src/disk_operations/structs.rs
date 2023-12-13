use std::path::PathBuf;

#[derive(serde::Serialize)]
pub struct Disk {
  pub(crate) file_system: Vec<u8>,
  pub(crate) mount_point: PathBuf,
  pub(crate) available_space: u64,
  pub(crate) total_space: u64,
  pub(crate) is_removable: bool,
  pub percent_free: f64,
  pub formatted_available_space: Option<String>,
  pub formatted_total_space: Option<String>,
}

#[derive(serde::Serialize)]
pub struct ReturnSystem {
  pub(crate) name: Option<String>,
  pub(crate) kernel_version: Option<String>,
  pub(crate) os_version: Option<String>,
  pub(crate) host_name: Option<String>,
}

#[derive(serde::Serialize)]
pub struct SystemInfo {
  pub(crate) system: ReturnSystem,
  pub(crate) disks: Vec<Disk>,
}
