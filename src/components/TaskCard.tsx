import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import type { Task, TaskStatus } from '../types'
import { TASK_STATUS_META, TASK_STATUSES } from '../types'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

function formatUpdatedLabel(updatedAt: string) {
  const updatedDate = new Date(updatedAt)
  const now = new Date()
  const diffMinutes = Math.max(
    1,
    Math.round((now.getTime() - updatedDate.getTime()) / 60000),
  )

  if (diffMinutes < 60) {
    return `Updated ${diffMinutes}m ago`
  }

  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) {
    return `Updated ${diffHours}h ago`
  }

  const diffDays = Math.round(diffHours / 24)
  return `Updated ${diffDays}d ago`
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const statusMeta = TASK_STATUS_META[task.status]

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: 'divider',
        borderLeft: 5,
        borderLeftColor: statusMeta.accent,
        bgcolor: 'background.paper',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 14px 30px rgba(7, 6, 10, 0.16)'
            : '0 14px 30px rgba(67, 52, 81, 0.05)',
      }}
    >
      <CardContent sx={{ pb: 2.25 }}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1}
            alignItems="flex-start"
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                fontWeight={800}
                noWrap
                title={task.title}
              >
                {task.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatUpdatedLabel(task.updatedAt)}
              </Typography>
            </Box>
            <Chip
              size="small"
              label={statusMeta.label}
              sx={{
                bgcolor: `${statusMeta.accent}16`,
                color: statusMeta.accent,
                border: '1px solid',
                borderColor: `${statusMeta.accent}30`,
              }}
            />
          </Stack>

          {task.description ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {task.description}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              No description provided.
            </Typography>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <FormControl size="small" fullWidth sx={{ minWidth: 0 }}>
              <InputLabel id={`${task.id}-status-label`}>Status</InputLabel>
              <Select
                labelId={`${task.id}-status-label`}
                label="Status"
                value={task.status}
                onChange={(event) =>
                  onStatusChange(task.id, event.target.value as TaskStatus)
                }
                MenuProps={{
                  disableScrollLock: true,
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  PaperProps: {
                    sx: {
                      mt: 0.75,
                    },
                  },
                  MenuListProps: {
                    sx: {
                      py: 0.75,
                    },
                  },
                }}
                SelectDisplayProps={{
                  'aria-label': `Status for ${task.title}`,
                }}
              >
                {TASK_STATUSES.map((status) => (
                  <MenuItem key={status} value={status}>
                    {TASK_STATUS_META[status].label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction="row" spacing={0.5} justifyContent="flex-end">
              <Tooltip title="Edit task">
                <IconButton
                  aria-label={`Edit ${task.title}`}
                  onClick={() => onEdit(task)}
                >
                  <EditRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete task">
                <IconButton
                  aria-label={`Delete ${task.title}`}
                  onClick={() => onDelete(task)}
                >
                  <DeleteRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
