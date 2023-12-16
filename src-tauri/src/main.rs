#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use diary::{__cmd__get_disk_info, __cmd__open_directory, get_disk_info, open_directory};
use tauri::generate_context;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_disk_info, open_directory])
    .run(generate_context!())
    .expect("error while running tauri application");
}
