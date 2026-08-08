import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { Task, TaskDraft } from '../types'

interface TaskDialogProps {
  open: boolean
  mode: 'create' | 'edit'
  task: Task | null
  onClose: () => void
  onSubmit: (draft: TaskDraft) => void
}

const MAX_TITLE_LENGTH = 120
const MAX_DESCRIPTION_LENGTH = 1000

export function TaskDialog({
  open,
  mode,
  task,
  onClose,
  onSubmit,
}: TaskDialogProps) {
  const initialValues = useMemo<TaskDraft>(
    () => ({
      title: task?.title ?? '',
      description: task?.description ?? '',
    }),
    [task],
  )

  const [title, setTitle] = useState(initialValues.title)
  const [description, setDescription] = useState(initialValues.description)
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  useEffect(() => {
    if (open) {
      setTitle(initialValues.title)
      setDescription(initialValues.description)
      setTitleError('')
      setDescriptionError('')
    }
  }, [initialValues.description, initialValues.title, open])

  const titleHelper = titleError || `${title.trim().length}/${MAX_TITLE_LENGTH}`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedTitle = title.trim().replace(/\s+/g, ' ')
    const normalizedDescription = description.trim()

    if (!normalizedTitle) {
      setTitleError('Title is required.')
      return
    }

    if (normalizedTitle.length > MAX_TITLE_LENGTH) {
      setTitleError(`Title must be ${MAX_TITLE_LENGTH} characters or fewer.`)
      return
    }

    if (normalizedDescription.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError(
        `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`,
      )
      return
    }

    onSubmit({
      title: normalizedTitle,
      description: normalizedDescription,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>
          <Stack spacing={0.75}>
            <Typography variant="h6">
              {mode === 'create' ? 'Create task' : 'Edit task'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Keep the work item crisp and actionable.
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              autoFocus
              label="Title"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
                setTitleError('')
              }}
              error={Boolean(titleError)}
              helperText={titleHelper}
              inputProps={{ maxLength: MAX_TITLE_LENGTH }}
              placeholder="Ship the task board"
              required
            />

            <TextField
              label="Description"
              name="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value)
                setDescriptionError('')
              }}
              placeholder="Optional detail, context, or acceptance notes."
              multiline
              minRows={4}
              error={Boolean(descriptionError)}
              inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
              helperText={
                descriptionError ||
                `${description.trim().length}/${MAX_DESCRIPTION_LENGTH} characters`
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <Button onClick={onClose} color="inherit" variant="text">
            Cancel
          </Button>
          <Button type="submit">Save task</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
