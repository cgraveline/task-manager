import type { Task, TaskStatus, ThemePreference } from './types'
import { TASK_STATUSES } from './types'

const TASKS_STORAGE_KEY = 'task-manager.tasks.v1'
const THEME_STORAGE_KEY = 'task-manager.theme.v1'

interface StoredTasksPayload {
  version: 1
  tasks: unknown[]
}

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && TASK_STATUSES.includes(value as TaskStatus)
}

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.description === 'string' &&
    isTaskStatus(candidate.status) &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  )
}

function isStoredTasksPayload(value: unknown): value is StoredTasksPayload {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return candidate.version === 1 && Array.isArray(candidate.tasks)
}

function sanitizeTask(task: Task): Task {
  return {
    ...task,
    title: task.title.trim(),
    description: task.description.trim(),
  }
}

export function loadTasks(): Task[] {
  const rawValue = readStorage(TASKS_STORAGE_KEY)

  if (!rawValue) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(rawValue)

    if (!isStoredTasksPayload(parsed)) {
      return []
    }

    return parsed.tasks.filter(isTask).map(sanitizeTask)
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): boolean {
  return writeStorage(
    TASKS_STORAGE_KEY,
    JSON.stringify({
      version: 1,
      tasks,
    }),
  )
}

export function loadThemePreference(): ThemePreference {
  const rawValue = readStorage(THEME_STORAGE_KEY)

  if (rawValue === 'light' || rawValue === 'dark' || rawValue === 'system') {
    return rawValue
  }

  return 'system'
}

export function saveThemePreference(themePreference: ThemePreference): boolean {
  return writeStorage(THEME_STORAGE_KEY, themePreference)
}

export function createTaskId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `task_${Math.random().toString(36).slice(2, 10)}`
}

export { TASKS_STORAGE_KEY, THEME_STORAGE_KEY }
