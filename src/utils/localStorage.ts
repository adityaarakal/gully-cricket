const STORAGE_PREFIX = 'gully-cricket-'

function getKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`
}

export const localStorage = {
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = window.localStorage.getItem(getKey(key))
      if (item === null) {
        return defaultValue ?? null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error)
      return defaultValue ?? null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(getKey(key), JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error)
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(getKey(key))
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error)
    }
  },

  clear(): void {
    try {
      const keys = Object.keys(window.localStorage)
      keys.forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          window.localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}

