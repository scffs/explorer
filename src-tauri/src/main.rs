#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use diary::{__cmd__get_disk_info, get_disk_info};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_disk_info])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
