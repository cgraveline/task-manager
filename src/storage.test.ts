import { beforeEach, describe, expect, it } from 'vitest'
import {
  loadTasks,
  loadThemePreference,
  saveTasks,
  saveThemePreference,
  TASKS_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from './storage'

describe('storage helpers', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('falls back to safe defaults for invalid data', () => {
    window.localStorage.setItem(TASKS_STORAGE_KEY, '{broken')
    window.localStorage.setItem(THEME_STORAGE_KEY, 'banana')

    expect(loadTasks()).toEqual([])
    expect(loadThemePreference()).toBe('system')
  })

  it('stores and loads valid data defensively', () => {
    const tasks = [
      {
        id: 'task-1',
        title: '  Ship the app  ',
        description: '  Keep it small.  ',
        status: 'todo',
        createdAt: '2026-08-08T00:00:00.000Z',
        updatedAt: '2026-08-08T00:00:00.000Z',
      },
    ] as const

    expect(saveTasks([...tasks])).toBe(true)
    expect(saveThemePreference('dark')).toBe(true)
    expect(loadTasks()).toEqual([
      {
        ...tasks[0],
        title: 'Ship the app',
        description: 'Keep it small.',
      },
    ])
    expect(loadThemePreference()).toBe('dark')
  })
})
