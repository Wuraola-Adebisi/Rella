const STORAGE_PREFIX = ''

export function readMockState<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    return raw ? Object.assign({}, fallback, JSON.parse(raw) as Partial<T>) as T : fallback
  } catch {
    return fallback
  }
}

export function writeMockState<T>(key: string, value: T): void {
  try { window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value)) }
  catch (error) { console.warn('Rella could not persist this workspace state.', error) }
}

export function removeMockState(key: string): void {
  window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
}

export function downloadWorkspace<T>(filename: string, data: T): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
