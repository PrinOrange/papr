// Save in-memory content through the native system save dialog.
//
// The dialog itself is shown by @tauri-apps/plugin-dialog (`save()`); the write
// runs in Rust via the `write_file` command, because the webview has no direct
// filesystem access. Returns whether a file was actually written — false when
// the user cancels, so callers can skip success feedback.

import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "../api";

/** Prompt for a destination and write `content` as UTF-8. Returns true if the
 *  file was written, false if the user cancelled the dialog. Throws on write
 *  failure, which callers surface through their normal error toast. */
export async function saveTextFile(
  content: string,
  defaultName: string,
  filterName: string,
  extensions: string[],
): Promise<boolean> {
  const path = await save({
    defaultPath: defaultName,
    filters: [{ name: filterName, extensions }],
  });
  if (!path) return false; // user cancelled
  await writeFile(path, new TextEncoder().encode(content));
  return true;
}
