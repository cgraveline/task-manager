import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Paper,
  Stack,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import SettingsBrightnessRoundedIcon from '@mui/icons-material/SettingsBrightnessRounded'
import { TaskColumn } from './components/TaskColumn'
import { TaskDialog } from './components/TaskDialog'
import { DeleteDialog } from './components/DeleteDialog'
import {
  createTaskId,
  loadTasks,
  loadThemePreference,
  saveTasks,
  saveThemePreference,
} from './storage'
import { buildTheme } from './theme'
import type { Task, TaskDraft, TaskStatus, ThemePreference } from './types'
import { TASK_STATUSES } from './types'

function getNowIso() {
  return new Date().toISOString()
}

function sortTasks(tasks: Task[]) {
  return [...tasks].sort((left, right) => {
    const updatedDiff = right.updatedAt.localeCompare(left.updatedAt)
    if (updatedDiff !== 0) {
      return updatedDiff
    }
    return right.createdAt.localeCompare(left.createdAt)
  })
}

function useThemePreference() {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    loadThemePreference(),
  )
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const resolvedMode =
    preference === 'system' ? (prefersDarkMode ? 'dark' : 'light') : preference

  useEffect(() => {
    saveThemePreference(preference)
  }, [preference])

  return {
    preference,
    resolvedMode,
    setPreference,
  }
}

export default function App() {
  const { preference, resolvedMode, setPreference } = useThemePreference()
  const theme = useMemo(() => buildTheme(resolvedMode), [resolvedMode])
  const [tasks, setTasks] = useState<Task[]>(() => sortTasks(loadTasks()))
  const [dialogState, setDialogState] = useState<{
    mode: 'create' | 'edit'
    task: Task | null
  } | null>(null)
  const [deleteTask, setDeleteTask] = useState<Task | null>(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const columns = useMemo(
    () =>
      TASK_STATUSES.map((status) => ({
        status,
        tasks: sortTasks(tasks.filter((task) => task.status === status)),
      })),
    [tasks],
  )

  const stats = useMemo(() => {
    const counts = TASK_STATUSES.reduce<Record<TaskStatus, number>>(
      (accumulator, status) => {
        accumulator[status] = tasks.filter(
          (task) => task.status === status,
        ).length
        return accumulator
      },
      {
        todo: 0,
        in_progress: 0,
        done: 0,
      },
    )

    return {
      total: tasks.length,
      active: counts.todo + counts.in_progress,
      done: counts.done,
    }
  }, [tasks])

  function openCreateDialog() {
    setDialogState({ mode: 'create', task: null })
  }

  function openEditDialog(task: Task) {
    setDialogState({ mode: 'edit', task })
  }

  function closeDialog() {
    setDialogState(null)
  }

  function handleSaveTask(draft: TaskDraft) {
    const nowIso = getNowIso()

    setTasks((currentTasks) => {
      if (!dialogState) {
        return currentTasks
      }

      if (dialogState.mode === 'create') {
        const nextTask: Task = {
          id: createTaskId(),
          title: draft.title,
          description: draft.description,
          status: 'todo',
          createdAt: nowIso,
          updatedAt: nowIso,
        }

        return sortTasks([nextTask, ...currentTasks])
      }

      return sortTasks(
        currentTasks.map((task) =>
          task.id === dialogState.task?.id
            ? {
                ...task,
                title: draft.title,
                description: draft.description,
                updatedAt: nowIso,
              }
            : task,
        ),
      )
    })

    closeDialog()
  }

  function handleDeleteTask(task: Task) {
    setDeleteTask(task)
  }

  function confirmDeleteTask(task: Task) {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== task.id),
    )
    setDeleteTask(null)
  }

  function handleStatusChange(taskId: string, status: TaskStatus) {
    const nowIso = getNowIso()

    setTasks((currentTasks) =>
      sortTasks(
        currentTasks.map((task) =>
          task.id === taskId ? { ...task, status, updatedAt: nowIso } : task,
        ),
      ),
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3.5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.25, md: 2.75 },
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(205, 191, 220, 0.18)'
                    : 'rgba(99, 79, 121, 0.14)',
                bgcolor: 'background.paper',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 22px 56px rgba(5, 4, 8, 0.32)'
                    : '0 22px 56px rgba(67, 52, 81, 0.1)',
              }}
            >
              <Stack spacing={2.25}>
                <Stack
                  direction={{ xs: 'column', lg: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', lg: 'center' }}
                  spacing={2}
                >
                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={{ xs: 1.25, md: 2 }}
                      alignItems={{ xs: 'flex-start', md: 'center' }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, letterSpacing: -0.04, lineHeight: 1.1 }}
                      >
                        Task manager
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ letterSpacing: -0.01 }}
                      >
                        Track work from backlog to done.
                      </Typography>
                    </Stack>
                  </Box>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.25}
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                  >
                    <ToggleButtonGroup
                      exclusive
                      value={preference}
                      onChange={(_, nextPreference: ThemePreference | null) => {
                        if (nextPreference) {
                          setPreference(nextPreference)
                        }
                      }}
                      aria-label="Theme preference"
                      size="small"
                    >
                      <Tooltip title="Use system theme" placement="top">
                        <ToggleButton
                          value="system"
                          aria-label="Use system theme"
                          title="Use system theme"
                        >
                          <SettingsBrightnessRoundedIcon fontSize="small" />
                        </ToggleButton>
                      </Tooltip>
                      <Tooltip title="Use light theme" placement="top">
                        <ToggleButton
                          value="light"
                          aria-label="Use light theme"
                          title="Use light theme"
                        >
                          <LightModeRoundedIcon fontSize="small" />
                        </ToggleButton>
                      </Tooltip>
                      <Tooltip title="Use dark theme" placement="top">
                        <ToggleButton
                          value="dark"
                          aria-label="Use dark theme"
                          title="Use dark theme"
                        >
                          <DarkModeRoundedIcon fontSize="small" />
                        </ToggleButton>
                      </Tooltip>
                    </ToggleButtonGroup>

                    <Button
                      startIcon={<AddRoundedIcon />}
                      onClick={openCreateDialog}
                      variant="contained"
                    >
                      Add task
                    </Button>
                  </Stack>
                </Stack>

                <Divider />

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                >
                  <Chip label={`${stats.total} total`} variant="outlined" size="small" />
                  <Chip label={`${stats.active} active`} color="secondary" variant="outlined" size="small" />
                  <Chip label={`${stats.done} done`} color="secondary" variant="outlined" size="small" />
                  <Chip label={`Theme: ${preference}`} variant="outlined" size="small" />
                </Stack>
              </Stack>
            </Paper>

            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, minmax(0, 1fr))',
                },
                alignItems: 'start',
              }}
            >
              {columns.map(({ status, tasks: tasksForStatus }) => (
                <TaskColumn
                  key={status}
                  status={status}
                  tasks={tasksForStatus}
                  onAddTask={status === 'todo' ? openCreateDialog : undefined}
                  onEditTask={openEditDialog}
                  onDeleteTask={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </Box>
          </Stack>
        </Container>

        <TaskDialog
          open={dialogState !== null}
          mode={dialogState?.mode ?? 'create'}
          task={dialogState?.task ?? null}
          onClose={closeDialog}
          onSubmit={handleSaveTask}
        />

        <DeleteDialog
          open={deleteTask !== null}
          task={deleteTask}
          onClose={() => setDeleteTask(null)}
          onConfirm={confirmDeleteTask}
        />
      </Box>
    </ThemeProvider>
  )
}
