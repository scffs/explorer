use std::fs::read_dir;
use crate::disk_operations::structs::DirectoryChild;

/// Поиск и возврат списка файлов в указанной директории. Функция не рекурсивная.
///
/// # Аргументы
///
/// * `path` - Строка, представляющая путь к директории, которую необходимо открыть.
///
/// # Возвращаемое значение
///
/// Возвращает результат, содержащий вектор вариантов перечисления DirectoryChild,
/// представляющих файлы и директории в указанной директории. Если происходит ошибка
/// в процессе чтения директории, возвращается пустой вектор.
#[tauri::command]
pub async fn open_directory(path: String) -> Result<Vec<DirectoryChild>, ()> {
  let directory = read_dir(&path).map_err(|_| ())?;

  // Формирование вектора DirectoryChild
  let result: Vec<_> = directory
    .filter_map(|entry| {
      entry.ok().map(|entry| convert_entry_to_directory_child(entry))
    })
    .collect();

  Ok(result)
}

/// Преобразование записи директории в объект DirectoryChild
fn convert_entry_to_directory_child(entry: std::fs::DirEntry) -> DirectoryChild {
  let name = entry.file_name().to_string_lossy().to_string();
  let path = entry.path().to_string_lossy().to_string();

  DirectoryChild { name, path }
}
