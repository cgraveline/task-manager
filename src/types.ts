export const TASK_STATUSES = ['todo', 'in_progress', 'done'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

export const TASK_STATUS_META = {
  todo: {
    label: 'To do',
    helper: 'Ready to start',
    accent: '#6741bf',
  },
  in_progress: {
    label: 'In progress',
    helper: 'Actively being worked on',
    accent: '#fd975d',
  },
  done: {
    label: 'Done',
    helper: 'Completed work',
    accent: '#00a370',
  },
} satisfies Record<
  TaskStatus,
  {
    label: string
    helper: string
    accent: string
  }
>

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface TaskDraft {
  title: string
  description: string
}

export const THEME_PREFERENCES = ['system', 'light', 'dark'] as const

export type ThemePreference = (typeof THEME_PREFERENCES)[number]
