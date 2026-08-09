import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import SyncRoundedIcon from '@mui/icons-material/SyncRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import type { ReactNode } from 'react'
import type { Task, TaskStatus } from '../types'
import { TASK_STATUS_META } from '../types'
import { TaskCard } from './TaskCard'

interface TaskColumnProps {
  status: TaskStatus
  tasks: Task[]
  onAddTask?: () => void
  onEditTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

const COLUMN_ICON: Record<TaskStatus, ReactNode> = {
  todo: <RadioButtonUncheckedRoundedIcon fontSize="small" />,
  in_progress: <PendingActionsRoundedIcon fontSize="small" />,
  done: <CheckCircleRoundedIcon fontSize="small" />,
}

const EMPTY_STATE_ICON: Record<TaskStatus, ReactNode> = {
  todo: <AssignmentRoundedIcon sx={{ fontSize: 30 }} />,
  in_progress: <SyncRoundedIcon sx={{ fontSize: 30 }} />,
  done: <TaskAltRoundedIcon sx={{ fontSize: 30 }} />,
}

const EMPTY_STATE_COPY: Record<
  TaskStatus,
  {
    eyebrow: string
    title: string
    description: string
  }
> = {
  todo: {
    eyebrow: 'Ready to begin',
    title: 'The next task starts here.',
    description: 'Add tasks to build momentum.',
  },
  in_progress: {
    eyebrow: 'Work in motion',
    title: 'Nothing is moving just yet.',
    description: 'Move tasks here as work gets underway.',
  },
  done: {
    eyebrow: 'Closed loop',
    title: 'Completed work will live here.',
    description: 'Mark tasks as done to track progress.',
  },
}

export function TaskColumn({
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}: TaskColumnProps) {
  const statusMeta = TASK_STATUS_META[status]
  const emptyStateCopy = EMPTY_STATE_COPY[status]

  return (
    <Paper
      component="section"
      aria-labelledby={`${status}-column-title`}
      variant="outlined"
      sx={{
        p: 2,
        height: '100%',
        minHeight: 520,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 16px 38px rgba(7, 6, 10, 0.2)'
            : '0 16px 38px rgba(67, 52, 81, 0.06)',
      }}
    >
      <Stack spacing={2} sx={{ height: '100%' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1.75}
          sx={{ height: 58 }}
        >
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1.1} alignItems="center">
              <Box
                sx={{
                  color: statusMeta.accent,
                  width: 20,
                  height: 20,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  transform: 'translateY(1px)',
                }}
              >
                {COLUMN_ICON[status]}
              </Box>
              <Typography
                id={`${status}-column-title`}
                variant="h6"
                sx={{ fontWeight: 800, letterSpacing: -0.02, lineHeight: 1.1 }}
              >
                {statusMeta.label}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ pl: 3.9, lineHeight: 1.4 }}
            >
              {statusMeta.helper}
            </Typography>
          </Stack>

          <Box
            component="span"
            sx={{
              minWidth: 36,
              px: 1.1,
              py: 0.5,
              borderRadius: 999,
              bgcolor: `${statusMeta.accent}18`,
              color: statusMeta.accent,
              typography: 'caption',
              fontWeight: 700,
              textAlign: 'center',
              border: '1px solid',
              borderColor: `${statusMeta.accent}2e`,
            }}
          >
            {tasks.length}
          </Box>
        </Stack>

        {tasks.length > 0 ? (
          <Stack spacing={1.5}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onStatusChange={onStatusChange}
              />
            ))}
          </Stack>
        ) : (
          <Paper
            variant="outlined"
            sx={{
              px: 3,
              py: 2,
              borderStyle: 'dashed',
              borderColor: 'divider',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(255, 255, 255, 0.84)',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack
              spacing={2.25}
              alignItems="center"
              textAlign="center"
              sx={{ width: '100%', maxWidth: 296, mx: 'auto' }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: `${statusMeta.accent}18`,
                  color: statusMeta.accent,
                  border: '1px solid',
                  borderColor: `${statusMeta.accent}2c`,
                  boxShadow: `inset 0 1px 0 ${statusMeta.accent}16`,
                }}
              >
                {EMPTY_STATE_ICON[status]}
              </Box>
              <Stack spacing={1.1} alignItems="center" sx={{ maxWidth: 264 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: statusMeta.accent,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  {emptyStateCopy.eyebrow}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={800}
                  sx={{ lineHeight: 1.2, maxWidth: 244, letterSpacing: -0.02, textWrap: 'balance' }}
                >
                  {emptyStateCopy.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.5, maxWidth: 264, textWrap: 'pretty' }}
                >
                  {emptyStateCopy.description}
                </Typography>
                {status === 'todo' && onAddTask ? (
                  <Button
                    size="small"
                    startIcon={<AddRoundedIcon />}
                    onClick={onAddTask}
                    sx={{ mt: 0.5 }}
                  >
                    Add task
                  </Button>
                ) : (
                  <Box sx={{ minHeight: 'calc(24px + 0.5rem)' }} />
                )}
              </Stack>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Paper>
  )
}
