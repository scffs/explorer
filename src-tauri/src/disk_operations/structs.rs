use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Serialize)]
pub(crate) struct Disk {
  pub(crate) file_system: Vec<u8>,
  pub(crate) mount_point: PathBuf,
  pub(crate) available_space: u64,
  pub(crate) total_space: u64,
  pub(crate) is_removable: bool,
  pub(crate) percent_free: f64,
  pub(crate) formatted_available_space: Option<String>,
  pub(crate) formatted_total_space: Option<String>,
}

#[derive(Serialize)]
pub(crate) struct ReturnSystem {
  pub(crate) name: Option<String>,
  pub(crate) kernel_version: Option<String>,
  pub(crate) os_version: Option<String>,
  pub(crate) host_name: Option<String>,
}

#[derive(Serialize)]
pub struct SystemInfo {
  pub(crate) system: ReturnSystem,
  pub(crate) disks: Vec<Disk>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct DirectoryChild {
  pub name: String,
  pub path: String,
}