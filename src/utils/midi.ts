import { invoke } from '@tauri-apps/api'

export async function listMidiConnections (): Promise<string[]> {
  if (window.__TAURI_IPC__) {
    console.log(await invoke('list_midi_connections'))
    return await invoke('list_midi_connections')
  }
}
